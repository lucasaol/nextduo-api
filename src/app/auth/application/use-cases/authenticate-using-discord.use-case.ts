import { DiscordService, DiscordUser } from "../services/discord.service";
import { Injectable } from "@nestjs/common";
import { AuthWithDiscordDto } from "../../request/auth-with-discord.dto";
import { UserService } from "../../../users/application/services/user.service";
import { CreateUserDto } from "../../../users/request/create-user.dto";
import { User } from "../../../users/domain/user.entity";
import { JwtService } from "@nestjs/jwt";

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
    }
    return this.jwt.sign({
      sub: user.id
    });
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

}