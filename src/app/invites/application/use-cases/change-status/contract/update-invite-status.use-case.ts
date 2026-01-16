import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { InviteService } from "@app/invites/application/services/invite.service";
import { Invite } from "@app/invites/domain/entities/invite.entity";
import { InviteStatus } from "@app/invites/enums/invite-status.enum";
import { User } from "@app/users/domain/entities/user.entity";

@Injectable()
export abstract class UpdateInviteStatusUseCase {

  private invite: Invite;
  private user: User;

  constructor(
    protected readonly service: InviteService
  ) {}

  protected abstract getPossibleStatus(): InviteStatus[];

  protected abstract getStatusToUpdate(): InviteStatus;

  protected abstract checkUserCanExecute(): void;

  protected async getInviteById(inviteId: string): Promise<Invite> {
    const invite = await this.service.findById(inviteId);
    if (!invite) {
      throw new NotFoundException(`Invite ${inviteId} not found.`);
    }
    return invite;
  }

  async execute(input: {inviteId: string, user: User}) {
    this.user = input.user;
    this.invite = await this.getInviteById(input.inviteId);

    this.checkStatus();
    this.checkUserCanExecute();

    const newStatus = this.getStatusToUpdate();
    await this.service.changeStatus(this.invite, newStatus);
    return this.invite;
  }

  private checkStatus() {
    const possibleStatus = this.getPossibleStatus();

    if (!possibleStatus.includes(<InviteStatus>this.invite.status)) {
      throw new UnprocessableEntityException("Cannot change the status.");
    }
  }

  protected checkUserReceived(): boolean {
    return this.invite.toUser.id === this.user.id;
  }

  protected checkUserRequested() {
    return this.invite.fromUser.id === this.user.id;
  }

}