import { Injectable } from "@nestjs/common";
import { RankService } from "@app/games/application/services/rank.service";
import { Game } from "@app/games/domain/entities/game.entity";
import { CreateRankDto } from "@app/games/dto/ranks/create-rank.dto";

@Injectable()
export class CreateRankUseCase {

  constructor(
    private readonly service: RankService
  ) { }

  async execute(
    game: Game,
    dto: CreateRankDto
  ) {
    return this.service.create(game.id, dto);
  }
}