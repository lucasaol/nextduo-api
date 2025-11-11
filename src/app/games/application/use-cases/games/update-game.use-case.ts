import { Injectable, NotFoundException } from "@nestjs/common";
import { GameService } from "@app/games/application/services/game.service";
import { UpdateGameDto } from "@app/games/dto/game/update-game.dto";

@Injectable()
export class UpdateGameUseCase {

  constructor(
    private readonly service: GameService
  ) { }

  async execute(id: string, dto: UpdateGameDto) {
    const game = await this.service.findById(id);
    if (!game) {
      throw new NotFoundException('Game not found.');
    }

    Object.entries(dto).forEach(([key, value]) => {
      if (value !== undefined && key in game) {
        (game as any)[key] = value;
      }
    });

    return this.service.update(game);
  }
}