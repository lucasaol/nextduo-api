import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from "@app/users/application/services/user.service";
import { JwtAuthGuard } from '@app/auth/helpers/guards/jwt-auth.guard';
import { CurrentUser } from '@app/auth/helpers/decorators/current-user.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {

  constructor(private readonly service: UserService) {}

  @Get('me')
  async me(@CurrentUser() user) {
    return user;
  }
}
