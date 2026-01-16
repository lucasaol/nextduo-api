import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { InviteRepository } from "@app/invites/domain/repositories/invite.repository";
import { Invite } from "@app/invites/domain/entities/invite.entity";
import { InviteStatus } from "@app/invites/enums/invite-status.enum";

interface CreateInviteInput {
  from_user_id: string;
  to_user_id: string;
  game_id: string;
  message?: string;
}
@Injectable()
export class InviteService {

  constructor(
    private readonly repo: InviteRepository
  ) { }

  async create(invite: CreateInviteInput): Promise<Invite> {
    return this.repo.create(plainToInstance(Invite, invite));
  }

  async findById(id: string): Promise<Invite|null> {
    return this.repo.findById(id);
  }

  async changeStatus(invite: Invite, newStatus: InviteStatus): Promise<void> {
    invite.status = newStatus;
    await this.repo.update(invite);
  }

  async findRequested(userId) {
    return await this.repo.findRequestedByUserId(userId);
  }

  async findRequests(userId) {
    return await this.repo.findReceivedByUserId(userId);
  }

}