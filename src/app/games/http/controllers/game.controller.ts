import { Body, Controller, Get, Patch, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { GameService } from "@app/games/application/services/game.service";
import { RolesGuard } from "@app/auth/helpers/guards/roles.guard";
import { UserRole } from "@app/users/enums/user-role.enum";
import { Roles } from "@app/auth/helpers/decorators/roles.decorator";
import { CreateGameDto } from "@app/games/dto/create-game.dto";
import { UpdateGameDto } from "@app/games/dto/update-game.dto";
import { CreateGameUseCase } from "@app/games/application/use-cases/create-game.use-case";
import { UpdateGameUseCase } from "@app/games/application/use-cases/update-game.use-case";
import { CurrentGame } from "@app/games/helpers/decorators/current-game.decorator";
import { Game } from "@app/games/domain/entities/game.entity";
import { LoadGameInterceptor } from "@app/games/helpers/interceptors/load-game.interceptor";

@Controller('games')
@UseGuards(RolesGuard)
export class GameController {

  constructor(
    private readonly gameService: GameService,
    private readonly createGame: CreateGameUseCase,
    private readonly updateGame: UpdateGameUseCase
  ) {}

  @Get()
  async findAll() {
    return await this.gameService.findAll();
  }

  @Get(':gameId')
  @UseInterceptors(LoadGameInterceptor)
  async findOne(
    @CurrentGame() game: Game
  ) {
    return game;
  }

  @Post()
  @Roles(UserRole.ROOT)
  async create(
    @Body() body: CreateGameDto
  ) {
    return await this.createGame.execute(body);
  }

  @Patch(':id')
  @Roles(UserRole.ROOT)
  @UseInterceptors(LoadGameInterceptor)
  async update(
    @CurrentGame() game: Game,
    @Body() body: UpdateGameDto
  ) {
    return await this.updateGame.execute(game, body);
  }
}