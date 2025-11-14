import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@app/users/domain/entities/user.entity";
import { UserController } from "@app/users/http/controllers/user.controller";
import { UserService } from "@app/users/application/services/user.service";
import { UserRepository } from "@app/users/domain/repositories/user.repository";
import { Gamelist } from "@app/users/domain/entities/gamelist.entity";
import { GameListController } from "@app/users/http/controllers/gamelist.controller";
import { GamesModule } from '@app/games/games.module';
import { AddGameToListUseCase } from '@app/users/application/use-cases/add-game-to-list.use-case';
import { GamelistService } from "@app/users/application/services/gamelist.service";
import { GamelistRepository } from "@app/users/domain/repositories/gamelist.repository";
import { RemoveGameFromListUseCase } from "@app/users/application/use-cases/remove-game-from-list.use-case-ts";
import { UpdateGameInListUseCase } from "@app/users/application/use-cases/update-game-in-list.use-case";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Gamelist]),
    GamesModule
  ],
  controllers: [UserController, GameListController],
  providers: [
    UserService, UserRepository,
    GamelistService, GamelistRepository,
    AddGameToListUseCase, RemoveGameFromListUseCase, UpdateGameInListUseCase
  ],
  exports: [UserService],
})
export class UsersModule {}
