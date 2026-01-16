import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { Invite } from "@app/invites/domain/entities/invite.entity";
import { InviteStatus } from "@app/invites/enums/invite-status.enum";

@Injectable()
export class InviteRepository {

  constructor(
    @InjectRepository(Invite)
    private readonly orm: Repository<Invite>
  ) {}

  async create(invite: Invite): Promise<Invite> {
    return await this.orm.save(invite);
  }

  async findById(id: string): Promise<Invite|null> {
    return await this.orm.findOne({
      where: { id },
      relations: {
        fromUser: true,
        toUser: true,
        game: true,
      },
    });
  }

  async update(invite: Invite): Promise<Invite> {
    return await this.orm.save(invite);
  }

  async findRequestedByUserId(userId: string): Promise<Invite[]> {
    return await this.orm.find({
      where: { from_user_id: userId, status: Not(InviteStatus.CANCELLED) },
      relations: {
        toUser: true,
        game: true,
      },
      order: { created_at: 'DESC' }
    });
  }

  async findReceivedByUserId(userId: string): Promise<Invite[]> {
    return await this.orm.find({
      where: { to_user_id: userId, status: Not(InviteStatus.CANCELLED) },
      relations: {
        fromUser: true,
        game: true,
      },
      order: { created_at: 'DESC' }
    });
  }
}