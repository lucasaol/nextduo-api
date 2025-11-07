import { Injectable } from "@nestjs/common";
import { UserRepository } from "@app/users/repository/user.repository";
import { CreateUserDto } from "@app/users/dto/create-user.dto";
import { User } from "@app/users/domain/user.entity";

@Injectable()
export class UserService {

  constructor(
    private readonly repo: UserRepository
  ) { }

  async create(user: CreateUserDto): Promise<User> {
    return this.repo.create(user);
  }

  async findByDiscordId(id: string): Promise<User|null> {
    return this.repo.findByDiscordId(id);
  }

}