import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { GameService } from "@app/games/application/services/game.service";
import { RolesGuard } from "@app/auth/helpers/guards/roles.guard";
import { UserRole } from "@app/users/enums/user-role.enum";
import { Roles } from "@app/auth/helpers/decorators/roles.decorator";
import { CreateGameDto } from "@app/games/dto/create-game.dto";
import { UpdateGameDto } from "@app/games/dto/update-game.dto";
import { CreateGameUseCase } from "@app/games/application/use-cases/games/create-game.use-case";
import { UpdateGameUseCase } from "@app/games/application/use-cases/games/update-game.use-case";

@Controller('game')
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

  @Post()
  @Roles(UserRole.ROOT)
  async create(
    @Body() body: CreateGameDto
  ) {
    return await this.createGame.execute(body);
  }

  @Patch(':id')
  @Roles(UserRole.ROOT)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateGameDto
  ) {
    return await this.updateGame.execute(id, body);
  }
}