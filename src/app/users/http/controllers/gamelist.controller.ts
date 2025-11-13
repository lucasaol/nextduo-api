import { Body, Controller, Delete, Get, Post, UseGuards, UseInterceptors, HttpCode, HttpStatus } from "@nestjs/common";
import { RolesGuard } from "@app/auth/helpers/guards/roles.guard";
import { CurrentUser } from "@app/auth/helpers/decorators/current-user.decorator";
import { User } from "@app/users/domain/entities/user.entity";
import { AddGameToListDto } from "@app/users/dto/add-game-to-list.dto";
import { CurrentGame } from "@app/games/helpers/decorators/current-game.decorator";
import { Game } from "@app/games/domain/entities/game.entity";
import { LoadGameInterceptor } from '@app/games/helpers/interceptors/load-game.interceptor';
import { AddGameToListUseCase } from '@app/users/application/use-cases/add-game-to-list.use-case';
import { RemoveGameFromListUseCase } from "@app/users/application/use-cases/remove-game-from-list.use-case-ts";

@Controller("users/games")
@UseGuards(RolesGuard)
export class GameListController {

  constructor(
    private readonly addGame: AddGameToListUseCase,
    private readonly removeGame: RemoveGameFromListUseCase
  ) {
  }

  @Get()
  async myList(@CurrentUser() user: User) {
    return user.gameList;
  }

  @Post(':gameId')
  @UseInterceptors(LoadGameInterceptor)
  async add(
    @CurrentUser() user: User,
    @CurrentGame() game: Game,
    @Body() body: AddGameToListDto
  ) {
    await this.addGame.execute(user, game, body);
  }

  @Delete(':gameId')
  @UseInterceptors(LoadGameInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @CurrentUser() user: User,
    @CurrentGame() game: Game,
  ) {
    await this.removeGame.execute(user, game);
  }
}
