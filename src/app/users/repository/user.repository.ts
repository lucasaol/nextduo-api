import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import { User } from "@app/users/domain/user.entity";
import { CreateUserDto } from "@app/users/dto/create-user.dto";

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
    return await this.orm.save(plainToInstance(User, user));
  }

  async findByDiscordId(id: string): Promise<User|null> {
    return await this.orm.findOne({
      where: {
        discord_id: id
      }
    })
  }
}