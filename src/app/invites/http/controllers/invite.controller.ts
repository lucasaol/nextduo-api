import { Body, Controller, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CurrentUser } from "@app/auth/helpers/decorators/current-user.decorator";
import { User } from "@app/users/domain/entities/user.entity";
import { CreateInviteDto } from "@app/invites/dto/create-invite.dto";
import { RolesGuard } from "@app/auth/helpers/guards/roles.guard";
import { CreateInviteUseCase } from "@app/invites/application/use-cases/create-invite.use-case";
import { AcceptInviteUseCase } from "@app/invites/application/use-cases/change-status/accept-invite.use-case";
import { RejectInviteUseCase } from "@app/invites/application/use-cases/change-status/reject-invite.use-case";
import { CancelInviteUseCase } from "@app/invites/application/use-cases/change-status/cancel-invite.use-case";

@Controller('invites')
@UseGuards(RolesGuard)
export class InviteController {

  constructor(
    private readonly createInvite: CreateInviteUseCase,
    private readonly acceptInvite: AcceptInviteUseCase,
    private readonly rejectInvite: RejectInviteUseCase,
    private readonly cancelInvite: CancelInviteUseCase,
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

  @Put('/:id/accept')
  async accept(
    @CurrentUser() currentUser: User,
    @Param('id') inviteId: string
  ) {
    return await this.acceptInvite.execute({inviteId, user: currentUser});
  }

  @Put('/:id/reject')
  async reject(
    @CurrentUser() currentUser: User,
    @Param('id') inviteId: string
  ) {
    return await this.rejectInvite.execute({inviteId, user: currentUser});
  }

  @Put('/:id/cancel')
  async cancel(
    @CurrentUser() currentUser: User,
    @Param('id') inviteId: string
  ) {
    return await this.cancelInvite.execute({ inviteId, user: currentUser });
  }
}