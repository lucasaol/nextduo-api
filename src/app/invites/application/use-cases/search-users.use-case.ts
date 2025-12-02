import { BadRequestException, Injectable } from "@nestjs/common";
import { GameService } from "@app/games/application/services/game.service";
import {
  PaginatedCursorSearchUsers,
  UserSearchRepository
} from "@app/invites/domain/repositories/user-search.repository";
import { User } from "@app/users/domain/entities/user.entity";
import { LastLoginFilter } from "@app/invites/enums/last-login-filter.enum";

interface SearchUsersInput {
  game_id?: string;
  rank_ids?: string[];
  last_login?: LastLoginFilter;
  requester: User;
  cursor?: string;
}

@Injectable()
export class SearchUsersUseCase {
  constructor(
    private readonly repo: UserSearchRepository,
    private readonly gameService: GameService,
  ) {}

  async find(params: SearchUsersInput) {
    await this.validate(params);

    const lastLoginDate = this.mapLastLoginDate(params.last_login);

    let cursor: PaginatedCursorSearchUsers | undefined = undefined;
    if (params.cursor) {
      const decodedCursor = Buffer.from(params.cursor, "base64").toString('utf8');
      const parsed = JSON.parse(decodedCursor);

      cursor = {
        d: new Date(parsed.d),
        i: parsed.i ?? null
      }
    }
    let rows = await this.repo.search({
      gameId: params.game_id,
      rankIds: params.rank_ids,
      requesterId: params.requester.id,
      lastLoginDate,
      cursor,
    });

    let nextCursor: string | null = null;
    if (rows.length > UserSearchRepository.DEFAULT_LIMIT) {
      const last = rows[rows.length - 1];

      const cursorData = {
        i: last.user_id,
        d: new Date(last.user_last_login),
      }
      nextCursor = Buffer.from(JSON.stringify(cursorData)).toString('base64');
      rows = rows.slice(0,UserSearchRepository.DEFAULT_LIMIT);
    }

    const usersMap = new Map<string, any>();
    for (const row of rows) {
      if (!usersMap.has(row.user_id)) {
        usersMap.set(row.user_id, {
          id: row.user_id,
          name: row.user_name,
          avatar: row.user_avatar,
          last_login_at: row.user_last_login,
          gameList: []
        });

        usersMap.get(row.user_id).gameList.push({
          id: row.gamelist_id,
          game: {
            id: row.game_id,
            name: row.game_name,
            image: row.game_image,
          },
          rank: {
            id: row.rank_id,
            name: row.rank_name,
            icon: row.rank_icon,
          }
        })
      }
    }

    return {
      data: [...usersMap.values()],
      nextCursor,
    }
  }

  private async validate(params: SearchUsersInput) {
    const { game_id, rank_ids } = params;
    if (game_id) {
      const game = await this.gameService.findById(game_id);
      if (!game) {
        throw new BadRequestException("Invalid game ID");
      }

      if (rank_ids?.length) {
        const validRanks = game.ranks.map((r) => r.id);
        for (const id of rank_ids) {
          if (!validRanks.includes(id)) {
            throw new BadRequestException(
              `Rank ${id} does not belong to ${game.name}`,
            );
          }
        }
      }
    }
  }

  private mapLastLoginDate(filter: LastLoginFilter | undefined) {
    if (!filter) {
      return undefined;
    }
    const now = new Date().getTime();
    switch (filter) {
      case LastLoginFilter.ONE_DAY:
        return new Date(now - 24 * 60 * 60 * 1000);
      case LastLoginFilter.ONE_WEEK:
        return new Date(now - 7 * 24 * 60 * 60 * 1000);
      case LastLoginFilter.ONE_MONTH:
        return new Date(now - 30 * 24 * 60 * 60 * 1000);
      default:
        return undefined;
    }
  }
}