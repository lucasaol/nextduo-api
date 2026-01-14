import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "@app/auth/helpers/decorators/current-user.decorator";
import { User } from "@app/users/domain/entities/user.entity";
import { CreateInviteDto } from "@app/invites/dto/create-invite.dto";
import { RolesGuard } from "@app/auth/helpers/guards/roles.guard";
import { CreateInviteUseCase } from "@app/invites/application/use-cases/create-invite.use-case";

@Controller('invites')
@UseGuards(RolesGuard)
export class InviteController {

  constructor(
    private readonly createInvite: CreateInviteUseCase
  ) {}

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() body: CreateInviteDto) {
    await this.createInvite.execute({
      ...body,
      currentUser: user
    })
  }
}