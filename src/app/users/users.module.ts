import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@app/users/domain/entities/user.entity";
import { UserController } from "@app/users/http/controllers/user.controller";
import { UserService } from "@app/users/application/services/user.service";
import { UserRepository } from "@app/users/domain/repositories/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UsersModule {}
