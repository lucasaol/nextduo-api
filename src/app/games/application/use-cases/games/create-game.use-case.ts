import { Injectable } from "@nestjs/common";
import { GameService } from "@app/games/application/services/game.service";
import { CreateGameDto } from "@app/games/dto/create-game.dto";

@Injectable()
export class CreateGameUseCase {

  constructor(
    private readonly service: GameService,
  ) { }

  async execute(
    dto: CreateGameDto
  ) {
    return this.service.create(dto);
  }
}