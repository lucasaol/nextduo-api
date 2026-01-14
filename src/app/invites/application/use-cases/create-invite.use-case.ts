import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateInviteDto } from "@app/invites/dto/create-invite.dto";
import { User } from "@app/users/domain/entities/user.entity";
import { InviteService } from "@app/invites/application/services/invite.service";

@Injectable()
export class CreateInviteUseCase {

  constructor(
    private readonly service: InviteService
  ) {}

  async execute(dto: CreateInviteDto & { currentUser: User }) {
    if (dto.user_id === dto.currentUser.id) {
      throw new BadRequestException("Invalid user");
    }

    await this.service.create({
      from_user_id: dto.currentUser.id,
      to_user_id: dto.user_id,
      game_id: dto.game_id,
      message: dto?.message
    })
  }
}