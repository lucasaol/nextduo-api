import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/auth/helpers/guards/jwt-auth.guard';
import { CurrentUser } from '@app/auth/helpers/decorators/current-user.decorator';
import { User } from '@app/users/domain/entities/user.entity';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {

  @Get('me')
  async me(@CurrentUser() user: User) {
    return user;
  }
}
