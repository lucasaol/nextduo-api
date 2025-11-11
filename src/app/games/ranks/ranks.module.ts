import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rank } from "@app/games/ranks/domain/entities/rank.entity";
import { GamesModule } from "@app/games/games.module";
import { RankController } from "@app/games/ranks/http/controllers/rank.controller";
import { RankService } from "@app/games/ranks/application/services/rank.service";
import { RankRepository } from "@app/games/ranks/domain/repositories/rank.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([Rank]),
    forwardRef(() => GamesModule)
  ],
  controllers: [
    RankController
  ],
  providers: [
    RankService,
    RankRepository
  ]
})
export class RanksModule {}