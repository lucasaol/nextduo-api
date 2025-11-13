import { Injectable } from "@nestjs/common";
import { GamelistService } from "@app/users/application/services/gamelist.service";
import { User } from "@app/users/domain/entities/user.entity";
import { Game } from "@app/games/domain/entities/game.entity";

@Injectable()
export class RemoveGameFromListUseCase {

  constructor(
    private readonly service: GamelistService
  ) {}

  async execute(
    user: User,
    game: Game
  ) {
    const existingGame = await this.service.findByUserAndGame(user, game);
    if (existingGame) {
      await this.service.remove(existingGame);
    }
  }
}