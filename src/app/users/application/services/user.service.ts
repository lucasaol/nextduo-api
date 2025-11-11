import { Injectable } from "@nestjs/common";
import { UserRepository } from "@app/users/domain/repositories/user.repository";
import { CreateUserDto } from "@app/users/dto/create-user.dto";
import { User } from "@app/users/domain/entities/user.entity";

@Injectable()
export class UserService {

  constructor(
    private readonly repo: UserRepository
  ) { }

  async create(user: CreateUserDto): Promise<User> {
    return this.repo.create(user);
  }

  async findById(id: string): Promise<User|null> {
    return this.repo.findById(id);
  }

  async findByDiscordId(id: string): Promise<User|null> {
    return this.repo.findByDiscordId(id);
  }

}