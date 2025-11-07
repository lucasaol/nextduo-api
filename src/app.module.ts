import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './app/users/users.module';
import { DatabaseModule } from "./database/database.module";
import { RequestValidatorModule } from './app/shared/validator/request-validator.module';
import { AuthModule } from "./app/auth/auth.module";
import { envSchema } from "./env";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true
    }),
    DatabaseModule,
    RequestValidatorModule,
    UsersModule,
    AuthModule
  ],
})
export class AppModule {}
