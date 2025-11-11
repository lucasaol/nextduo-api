import { Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common";
import { RolesGuard } from "@app/auth/helpers/guards/roles.guard";
import { LoadGameInterceptor } from "@app/games/helpers/interceptors/load-game.interceptor";
import { CurrentGame } from "@app/games/helpers/decorators/current-game.decorator";
import { Game } from "@app/games/domain/entities/game.entity";

@Controller('games/:gameId/ranks')
@UseInterceptors(LoadGameInterceptor)
@UseGuards(RolesGuard)
export class RankController {

  @Get()
  async findAll(
    @CurrentGame() game: Game,
  ) {
    return game.ranks;
  }

}