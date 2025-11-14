import { BadRequestException, Injectable } from "@nestjs/common";
import { GamelistService } from "@app/users/application/services/gamelist.service";
import { User } from "@app/users/domain/entities/user.entity";
import { Game } from "@app/games/domain/entities/game.entity";
import { UpdateGameInListDto } from "@app/users/dto/update-game-in-list.dto";

@Injectable()
export class UpdateGameInListUseCase {

  constructor(
    private readonly service: GamelistService
  ) {}

  async execute(
    user: User,
    game: Game,
    dto: UpdateGameInListDto
  ) {
    const rank = game.ranks.find((r) => r.id === dto.rank_id);
    if (!rank) {
      throw new BadRequestException("Invalid rank");
    }

    const existingGame = await this.service.findByUserAndGame(user, game);
    if (!existingGame) {
      throw new BadRequestException("Game is not in list");
    }

    existingGame.rank = rank;
    await this.service.update(existingGame);

    return existingGame;
  }
}