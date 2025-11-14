import { DiscordService, DiscordUser } from "../services/discord.service";
import { Injectable } from "@nestjs/common";
import { AuthWithDiscordDto } from "../../dto/auth-with-discord.dto";
import { UserService } from "@app/users/application/services/user.service";
import { CreateUserDto } from "@app/users/dto/create-user.dto";
import { User } from "@app/users/domain/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "@app/auth/helpers/strategies/jwt.strategy";

@Injectable()
export class AuthenticateUsingDiscordUseCase {

  constructor(
    private readonly discord: DiscordService,
    private readonly users: UserService,
    private readonly jwt: JwtService
  )
  { }

  async auth(dto: AuthWithDiscordDto) {
    const discordUser= await this.discord.getUserByAuthorizationCode(dto.code);

    let user = await this.users.findByDiscordId(discordUser.id);
    if (!user) {
      user = await this.createUserWithDiscordInfo(discordUser);
    } else {
      this.updateLastLogin(user)
    }


    const payload: JwtPayload = {
      sub: user.id,
      name: user.name,
      role: user.role,
    };
    return this.jwt.sign(payload);
  }

  private async createUserWithDiscordInfo(discordUser: DiscordUser): Promise<User> {
    const userDto = new CreateUserDto();

    userDto.discord_id = discordUser.id;
    userDto.name = discordUser.global_name ?? `${discordUser.username}:${discordUser.discriminator}`;
    userDto.email = discordUser.email ?? null;
    userDto.avatar = (discordUser.avatar
      ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
      : null
    );

    return await this.users.create(userDto);
  }

  private async updateLastLogin(user: User): Promise<void> {
    return await this.users.updateLastLogin(user);
  }

}