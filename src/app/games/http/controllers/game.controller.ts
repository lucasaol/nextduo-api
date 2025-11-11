import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { GameService } from "@app/games/application/services/game.service";
import { RolesGuard } from "@app/auth/helpers/guards/roles.guard";
import { UserRole } from "@app/users/enums/user-role.enum";
import { Roles } from "@app/auth/helpers/decorators/roles.decorator";

@Controller('game')
@UseGuards(RolesGuard)
export class GameController {

  constructor(
    private readonly gameService: GameService
  ) {}

  @Get()
  async findAll() {
    return await this.gameService.findAll();
  }

  @Post()
  @Roles(UserRole.ROOT)
  async create() {
    return {
      ok: true
    }
  }
}