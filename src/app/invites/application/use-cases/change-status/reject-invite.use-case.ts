import { ForbiddenException, Injectable } from "@nestjs/common";
import { UpdateInviteStatusUseCase } from "@app/invites/application/use-cases/change-status/contract/update-invite-status.use-case";
import { InviteStatus } from "@src/app/invites/enums/invite-status.enum";

@Injectable()
export class RejectInviteUseCase extends UpdateInviteStatusUseCase {

  protected getPossibleStatus(): InviteStatus[] {
    return [InviteStatus.PENDING];
  }

  protected getStatusToUpdate(): InviteStatus {
    return InviteStatus.REJECTED;
  }

  protected checkUserCanExecute(): void {
    if (!this.checkUserReceived()) {
      throw new ForbiddenException('Cannot reject invite');
    }
  }

}