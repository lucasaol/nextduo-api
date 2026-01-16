import { Injectable } from "@nestjs/common";
import { InviteService } from "@app/invites/application/services/invite.service";
import { User } from "@app/users/domain/entities/user.entity";

@Injectable()
export class ListInvitesUseCase {

  constructor(
    private readonly service: InviteService
  ) {}

  async received(currentUser: User) {
    return await this.service.findReceived(currentUser.id);
  }

  async requested(currentUser: User) {
    return await this.service.findRequested(currentUser.id);
  }

}