import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './app/users/users.module';
import { DatabaseModule } from "./database/database.module";
import { RequestValidatorModule } from './app/shared/validator/request-validator.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RequestValidatorModule,
    UsersModule
  ],
})
export class AppModule {}
