import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InviteController } from "@app/invites/http/controllers/invite.controller";
import { UserSearchController } from "@app/invites/http/controllers/user-search.controller";
import { SearchUsersUseCase } from "@app/invites/application/use-cases/search-users.use-case";
import { GamesModule } from "@app/games/games.module";
import { UsersModule } from "@app/users/users.module";
import { UserSearchRepository } from "@app/invites/domain/repositories/user-search.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    GamesModule,
    UsersModule
  ],
  controllers: [
    UserSearchController,
    InviteController
  ],
  providers: [
    SearchUsersUseCase,
    UserSearchRepository
  ]
})
export class InvitesModule { }