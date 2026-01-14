import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InviteController } from "@app/invites/http/controllers/invite.controller";
import { UserSearchController } from "@app/invites/http/controllers/user-search.controller";
import { SearchUsersUseCase } from "@app/invites/application/use-cases/search-users.use-case";
import { GamesModule } from "@app/games/games.module";
import { UsersModule } from "@app/users/users.module";
import { UserSearchRepository } from "@app/invites/domain/repositories/user-search.repository";
import { CreateInviteUseCase } from "@app/invites/application/use-cases/create-invite.use-case";
import { InviteRepository } from "@app/invites/domain/repositories/invite.repository";
import { InviteService } from "@app/invites/application/services/invite.service";
import { Invite } from "@app/invites/domain/entities/invite.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Invite]),
    GamesModule,
    UsersModule
  ],
  controllers: [
    UserSearchController,
    InviteController
  ],
  providers: [
    UserSearchRepository,
    InviteService, InviteRepository,
    SearchUsersUseCase, CreateInviteUseCase
  ]
})
export class InvitesModule { }