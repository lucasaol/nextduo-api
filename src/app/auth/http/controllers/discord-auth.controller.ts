import { Body, Controller, Post } from "@nestjs/common";
import { AuthWithDiscordDto } from "../../request/auth-with-discord.dto";
import { AuthenticateUsingDiscordUseCase } from "../../application/use-cases/authenticate-using-discord.use-case";

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