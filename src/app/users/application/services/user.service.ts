import { Injectable } from "@nestjs/common";
import { UserRepository } from "@app/users/domain/repositories/user.repository";
import { CreateUserDto } from "@app/users/dto/create-user.dto";
import { User } from "@app/users/domain/entities/user.entity";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UserService {

  constructor(
    private readonly repo: UserRepository
  ) { }

  async create(user: CreateUserDto): Promise<User> {
    return this.repo.create(plainToInstance(User, user));
  }

  async findById(id: string): Promise<User|null> {
    return this.repo.findById(id);
  }

  async findByDiscordId(id: string): Promise<User|null> {
    return this.repo.findByDiscordId(id);
  }

  async updateLastLogin(user: User): Promise<void> {
    user.last_login_at = new Date();
    await this.repo.update(user);
  }

}