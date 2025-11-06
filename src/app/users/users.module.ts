import { Module } from '@nestjs/common';
import { UserController } from './http/controllers/user.controller';
import { UserService } from "./application/user.service";
import { UserRepository } from "./repository/user.repository";
import { User } from "./domain/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UsersModule {}
