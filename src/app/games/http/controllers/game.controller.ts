import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@app/auth/helpers/guards/jwt-auth.guard";
import { GameService } from "@app/games/application/services/game.service";

@Controller('game')
@UseGuards(JwtAuthGuard)
export class GameController {

  constructor(
    private readonly gameService: GameService
  ) {}

  @Get()
  async findAll() {
    return await this.gameService.findAll();
  }
}