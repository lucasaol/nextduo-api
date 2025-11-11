import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@app/users/enums/user-role.enum';
import { ROLES_KEY } from '@app/auth/helpers/decorators/roles.decorator';
import { isObservable, lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '@app/auth/helpers/guards/jwt-auth.guard';

@Injectable()
export class RolesGuard extends JwtAuthGuard {
  constructor(private reflector: Reflector)
  {
    super();
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles?.length) {
      const res = super.canActivate(context);
      if (isObservable(res)) {
        return await lastValueFrom(res);
      }
      return res as boolean | Promise<boolean>;
    }

    const allowed = super.canActivate(context);
    const can = isObservable(allowed)
      ? await lastValueFrom(allowed)
      : await allowed as boolean | Promise<boolean>;

    if (!can) {
      return false;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException("Not Authorized.");
    }

    return true;
  }
}