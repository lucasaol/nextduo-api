import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { User } from "../domain/user.entity";
import { CreateUserDto } from "../request/create-user.dto";

@Injectable()
export class UserService {

  constructor(
    private readonly repo: UserRepository
  ) { }

  async findAll(): Promise<User[]> {
    return await this.repo.all();
  }

  async create(user: CreateUserDto): Promise<User> {
    return await this.repo.create(user);
  }


}