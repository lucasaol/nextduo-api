import { Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common";
import { RolesGuard } from "@app/auth/helpers/guards/roles.guard";
import { FindRanksByGameUseCase } from "@app/games/application/use-cases/ranks/find-ranks-by-game.use-case";
import { LoadGameInterceptor } from "@app/games/interceptors/load-game.interceptor";
import { Game } from "@app/games/decorators/game.decorator";
import { Game as GameEntity } from "@app/games/domain/entities/game.entity";

@Controller('games/:gameId/ranks')
@UseInterceptors(LoadGameInterceptor)
@UseGuards(RolesGuard)
export class RankController {

  constructor(
    private readonly findRanks: FindRanksByGameUseCase
  ) { }

  @Get()
  async findAll(
    @Game() game: GameEntity,
  ) {
    return game.ranks;
  }

}