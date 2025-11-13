import { Module } from '@nestjs/common';
import { GameController } from "@app/games/http/controllers/game.controller";
import { GameService } from "@app/games/application/services/game.service";
import { GameRepository } from "@app/games/domain/repositories/game.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "@app/games/domain/entities/game.entity";
import { CreateGameUseCase } from "@app/games/application/use-cases/create-game.use-case";
import { UpdateGameUseCase } from "@app/games/application/use-cases/update-game.use-case";
import { LoadGameInterceptor } from "@app/games/helpers/interceptors/load-game.interceptor";
import { RanksModule } from "@app/games/ranks/ranks.module";
import { RankService } from "@app/games/application/services/rank.service";
import { RankRepository } from "@app/games/domain/repositories/rank.repository";
import { ReorderRanksUseCase } from "@app/games/application/use-cases/reorder-ranks.use-case";
import { RankController } from "@app/games/http/controllers/rank.controller";
import { Rank } from "@app/games/domain/entities/rank.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, Rank]),
    RanksModule
  ],
  controllers: [
    GameController,
    RankController
  ],
  providers: [
    GameService,
    GameRepository,
    CreateGameUseCase,
    UpdateGameUseCase,
    LoadGameInterceptor,
    RankService,
    RankRepository,
    ReorderRanksUseCase
  ],
  exports: [
    GameService,
    LoadGameInterceptor
  ]
})
export class GamesModule {}
