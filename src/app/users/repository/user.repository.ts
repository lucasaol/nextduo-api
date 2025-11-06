import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../domain/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "../request/create-user.dto";

@Injectable()
export class UserRepository {

  constructor(
    @InjectRepository(User)
    private readonly orm: Repository<User>,
  ) { }

  async all(): Promise<User[]> {
    return await this.orm.find();
  }

  async create(user: CreateUserDto): Promise<User> {
    return this.orm.save(user);
  }
}