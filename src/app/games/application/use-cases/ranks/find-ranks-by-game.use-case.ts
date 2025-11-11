import { Injectable, NotFoundException } from "@nestjs/common";
import { GameService } from "@app/games/application/services/game.service";

@Injectable()
export class FindRanksByGameUseCase {

  constructor(
    private readonly game: GameService
  ) { }

  async execute(gameId: string) {
    const game = await this.game.findById(gameId);
    if (!game) {
      throw new NotFoundException(`Game ${gameId} not found`);
    }
    return game.ranks;
  }
}