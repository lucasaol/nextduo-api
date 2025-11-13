import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "@app/users/domain/entities/user.entity";
import { Game } from "@app/games/domain/entities/game.entity";
import { AddGameToListDto } from "@app/users/dto/add-game-to-list.dto";
import { Gamelist } from "@app/users/domain/entities/gamelist.entity";
import { GamelistService } from "@app/users/application/services/gamelist.service";

@Injectable()
export class AddGameToListUseCase {

  constructor(
    private readonly service: GamelistService
  ) {}

  async execute(
    user: User,
    game: Game,
    dto: AddGameToListDto
  ) {
    const rank = game.ranks.find((r) => r.id === dto.rank_id);
    if (!rank) {
      throw new BadRequestException("Invalid rank");
    }

    const existingGame = await this.service.findByUserAndGame(user, game);
    if (existingGame) {
      throw new BadRequestException("Game is already in list");
    }

    const newGame = new Gamelist();
    newGame.user_id = user.id;
    newGame.game_id = game.id;
    newGame.rank_id = rank.id;

    await this.service.add(newGame);
  }

}