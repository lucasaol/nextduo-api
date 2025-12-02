import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";

export interface PaginatedCursorSearchUsers {
  i: string;
  d: Date
}
interface SearchUsersFilters {
  gameId?: string;
  rankIds?: string[];
  lastLoginDate?: Date;
  requesterId: string;
  cursor?: PaginatedCursorSearchUsers;
}

@Injectable()
export class UserSearchRepository {

  static readonly DEFAULT_LIMIT = 24;

  constructor(
    @InjectDataSource()
    private readonly db: DataSource
  ) { }

  async search(filters: SearchUsersFilters) {
    const { gameId, rankIds, requesterId, lastLoginDate, cursor } = filters;

    const query = this.db.createQueryBuilder()
      .from('users', 'u')
      .innerJoin('gamelist', 'gl', 'gl.user_id = u.id')
      .innerJoin('games', 'g', 'gl.game_id = g.id')
      .innerJoin('ranks', 'r', 'gl.rank_id = r.id')
      .where('u.id != :requesterId', { requesterId });

    if (gameId) {
      query.andWhere('gl.game_id = :gameId', { gameId });
    }
    if (rankIds) {
      query.andWhere('gl.rank_id IN (:...rankIds)', { rankIds });
    }
    if (lastLoginDate) {
      query.andWhere('u.last_login_at >= :lastLoginDate', { lastLoginDate });
    }

    if (cursor) {
      query.andWhere(`(
        u.last_login_at < :cursorLastLogin
        OR (u.last_login_at = :cursorLastLogin AND u.id < :cursorId)
      )`, {
        cursorLastLogin: cursor.d,
        cursorId: cursor.i
      });
    }

    query.orderBy('u.last_login_at', 'DESC')
      .addOrderBy('u.id', 'DESC')
      .limit(UserSearchRepository.DEFAULT_LIMIT + 1)

    return await query.select([
      'u.id AS user_id',
      'u.name AS user_name',
      'u.avatar AS user_avatar',
      'u.last_login_at AS user_last_login',

      'gl.id AS gamelist_id',
      'g.id AS game_id',
      'g.name AS game_name',
      'g.image AS game_image',

      'r.id AS rank_id',
      'r.name AS rank_name',
      'r.icon AS rank_icon',
    ]).getRawMany();
  }

}