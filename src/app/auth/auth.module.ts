import { Module } from "@nestjs/common";
import { DiscordAuthController } from "./http/controllers/discord-auth.controller";
import { AuthenticateUsingDiscordUseCase } from "./application/use-cases/authenticate-using-discord.use-case";
import { DiscordService } from "./application/services/discord.service";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Env } from "../../env";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true});
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true});

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      }
    }),
    UsersModule
  ],
  controllers: [DiscordAuthController],
  providers: [
    AuthenticateUsingDiscordUseCase,
    DiscordService
  ]
})
export class AuthModule {}