import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Invite } from "@app/invites/domain/entities/invite.entity";
import { Repository } from "typeorm";

@Injectable()
export class InviteRepository {

  constructor(
    @InjectRepository(Invite)
    private readonly orm: Repository<Invite>
  ) {}

  async create(invite: Invite): Promise<Invite> {
    return await this.orm.save(invite);
  }
}