import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { SearchUsersDto } from "@app/invites/dto/search-users.dto";
import { SearchUsersUseCase } from "@app/invites/application/use-cases/search-users.use-case";
import { CurrentUser } from "@app/auth/helpers/decorators/current-user.decorator";
import { User } from "@app/users/domain/entities/user.entity";
import { JwtAuthGuard } from "@app/auth/helpers/guards/jwt-auth.guard";

@Controller('users/search')
@UseGuards(JwtAuthGuard)
export class UserSearchController {

  constructor(
    private readonly searchUsers: SearchUsersUseCase
  ) {}

  @Get()
  async search(
    @CurrentUser() user: User,
    @Query() params: SearchUsersDto
  ) {
    return await this.searchUsers.find({
      ...params,
      requester: user
    });
  }

}