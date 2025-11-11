import { Injectable } from "@nestjs/common";
import { GameService } from "@app/games/application/services/game.service";
import { UpdateGameDto } from "@app/games/dto/update-game.dto";
import { Game } from "@app/games/domain/entities/game.entity";

@Injectable()
export class UpdateGameUseCase {

  constructor(
    private readonly service: GameService
  ) { }

  async execute(game: Game, dto: UpdateGameDto) {
    Object.entries(dto).forEach(([key, value]) => {
      if (value !== undefined && key in game) {
        (game as any)[key] = value;
      }
    });

    return this.service.update(game);
  }
}