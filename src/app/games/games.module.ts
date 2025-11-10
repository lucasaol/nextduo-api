import { Module } from '@nestjs/common';
import { GameController } from "@app/games/http/controllers/game.controller";
import { GameService } from "@app/games/application/services/game.service";
import { GameRepository } from "@app/games/repository/game.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "@app/games/domain/game.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  controllers: [
    GameController
  ],
  providers: [
    GameRepository, GameService
  ]
})
export class GamesModule {}
