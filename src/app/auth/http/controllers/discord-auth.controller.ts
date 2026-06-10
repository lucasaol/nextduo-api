import { Controller, Get, Post, Query, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Response } from "express";
import { AuthenticateUsingDiscordUseCase } from "@app/auth/application/use-cases/authenticate-using-discord.use-case";
import { DiscordService } from "@app/auth/application/services/discord.service";
import { AuthWithDiscordDto } from "@app/auth/dto/auth-with-discord.dto";
import { Env } from "@src/env";

@Controller("auth/discord")
export class DiscordAuthController {

  constructor(
    private readonly app: AuthenticateUsingDiscordUseCase,
    private readonly discord: DiscordService,
    private readonly config: ConfigService<Env, true>
  ) {}

  @Post()
  login() {
    return {
      url: this.discord.getAuthorizationUrl()
    };
  }

  @Get('/callback')
  async loginGet(
    @Query() params: AuthWithDiscordDto,
    @Res() res: Response
  ) {
    const accessToken = await this.app.auth(params);

    const redirectUrl = new URL(
      this.config.get('DISCORD_AUTH_SUCCESS_REDIRECT_URL', { infer: true })
    );
    redirectUrl.searchParams.set('accessToken', accessToken);

    return res.redirect(redirectUrl.toString());
  }
}