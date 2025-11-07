import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../repository/user.repository";
import { User } from "../../domain/user.entity";
import { CreateUserDto } from "../../dto/create-user.dto";

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