import { Module } from '@nestjs/common';
import { GameController } from "@app/games/http/controllers/game.controller";
import { GameService } from "@app/games/application/services/game.service";
import { GameRepository } from "@app/games/domain/repositories/game.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "@app/games/domain/entities/game.entity";
import { CreateGameUseCase } from "@app/games/application/use-cases/games/create-game.use-case";
import { UpdateGameUseCase } from "@app/games/application/use-cases/games/update-game.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  controllers: [
    GameController
  ],
  providers: [
    GameRepository, GameService, CreateGameUseCase, UpdateGameUseCase
  ]
})
export class GamesModule {}
