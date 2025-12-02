import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "@app/users/users.module";
import { DatabaseModule } from "./database/database.module";
import { RequestValidatorModule } from "@app/shared/validator/request-validator.module";
import { AuthModule } from "@app/auth/auth.module";
import { envSchema } from "./env";
import { GamesModule } from '@app/games/games.module';
import { InvitesModule } from "@app/invites/invites.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true
    }),
    DatabaseModule,
    RequestValidatorModule,
    UsersModule,
    AuthModule,
    GamesModule,
    InvitesModule
  ],
})
export class AppModule {}
