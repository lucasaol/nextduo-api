import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Put
} from "@nestjs/common";
import { RolesGuard } from "@app/auth/helpers/guards/roles.guard";
import { CurrentUser } from "@app/auth/helpers/decorators/current-user.decorator";
import { User } from "@app/users/domain/entities/user.entity";
import { AddGameToListDto } from "@app/users/dto/add-game-to-list.dto";
import { CurrentGame } from "@app/games/helpers/decorators/current-game.decorator";
import { Game } from "@app/games/domain/entities/game.entity";
import { LoadGameInterceptor } from '@app/games/helpers/interceptors/load-game.interceptor';
import { AddGameToListUseCase } from '@app/users/application/use-cases/add-game-to-list.use-case';
import { RemoveGameFromListUseCase } from "@app/users/application/use-cases/remove-game-from-list.use-case-ts";
import { UpdateGameInListUseCase } from "@app/users/application/use-cases/update-game-in-list.use-case";

@Controller("users/games")
@UseGuards(RolesGuard)
@UseInterceptors(LoadGameInterceptor)
export class GameListController {

  constructor(
    private readonly addGame: AddGameToListUseCase,
    private readonly updateGame: UpdateGameInListUseCase,
    private readonly removeGame: RemoveGameFromListUseCase
  ) {
  }

  @Get()
  async myList(@CurrentUser() user: User) {
    return user.gameList;
  }

  @Post(':gameId')
  async add(
    @CurrentUser() user: User,
    @CurrentGame() game: Game,
    @Body() body: AddGameToListDto
  ) {
    await this.addGame.execute(user, game, body);
  }

  @Put(':gameId')
  async update(
    @CurrentUser() user: User,
    @CurrentGame() game: Game,
    @Body() body: AddGameToListDto
  ) {
    return await this.updateGame.execute(user, game, body);
  }

  @Delete(':gameId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @CurrentUser() user: User,
    @CurrentGame() game: Game,
  ) {
    await this.removeGame.execute(user, game);
  }
}
