import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { InviteRepository } from "@app/invites/domain/repositories/invite.repository";
import { Invite } from "@app/invites/domain/entities/invite.entity";

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

}