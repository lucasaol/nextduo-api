import { Module } from '@nestjs/common';
import { GameController } from "@app/games/http/controllers/game.controller";
import { GameService } from "@app/games/application/services/game.service";
import { GameRepository } from "@app/games/domain/repositories/game.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "@app/games/domain/entities/game.entity";
import { CreateGameUseCase } from "@app/games/application/use-cases/games/create-game.use-case";
import { UpdateGameUseCase } from "@app/games/application/use-cases/games/update-game.use-case";
import { RankController } from "@app/games/http/controllers/rank.controller";
import { Rank } from "@app/games/domain/entities/rank.entity";
import { RankRepository } from "@app/games/domain/repositories/rank.repository";
import { RankService } from "@app/games/application/services/rank.service";
import { LoadGameInterceptor } from "@app/games/interceptors/load-game.interceptor";

@Module({
  imports: [TypeOrmModule.forFeature([Game, Rank])],
  controllers: [
    GameController,
    RankController
  ],
  providers: [
    GameRepository, GameService, CreateGameUseCase, UpdateGameUseCase,
    RankRepository, RankService,
    LoadGameInterceptor
  ]
})
export class GamesModule {}
