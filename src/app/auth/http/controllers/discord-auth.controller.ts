import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticateUsingDiscordUseCase } from "@app/auth/application/use-cases/authenticate-using-discord.use-case";
import { AuthWithDiscordDto } from "@app/auth/dto/auth-with-discord.dto";

@Controller("auth/discord")
export class DiscordAuthController {

  constructor(
    private readonly app: AuthenticateUsingDiscordUseCase
  ) {}

  @Post()
  async login(
    @Body() request: AuthWithDiscordDto
  ) {
    const accessToken = await this.app.auth(request);
    return {
      access_token: accessToken
    }
  }
}