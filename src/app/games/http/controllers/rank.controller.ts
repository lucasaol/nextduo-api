import { Body, Controller, Get, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { RolesGuard } from "@app/auth/helpers/guards/roles.guard";
import { LoadGameInterceptor } from "@app/games/helpers/interceptors/load-game.interceptor";
import { CurrentGame } from "@app/games/helpers/decorators/current-game.decorator";
import { Game } from "@app/games/domain/entities/game.entity";
import { ReorderRanksDto } from "@app/games/dto/reorder-ranks.dto";
import { ReorderRanksUseCase } from "@app/games/application/use-cases/reorder-ranks.use-case";
import { RankService } from "@app/games/application/services/rank.service";
import { UserRole } from "@app/users/enums/user-role.enum";
import { Roles } from "@app/auth/helpers/decorators/roles.decorator";

@Controller('games/:gameId/ranks')
@UseInterceptors(LoadGameInterceptor)
@UseGuards(RolesGuard)
export class RankController {

  constructor(
    private readonly order: ReorderRanksUseCase,
    private readonly service: RankService
  ) { }

  @Get()
  async findAll(
    @CurrentGame() game: Game,
  ) {
    return game.ranks;
  }

  @Put('reorder')
  @Roles(UserRole.ROOT)
  async reorder(
    @CurrentGame() game: Game,
    @Body() body: ReorderRanksDto
  ) {
    await this.order.execute(game.ranks, body);
    return this.service.findByGameId(game.id);
  }

}