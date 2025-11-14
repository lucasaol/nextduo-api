import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "@app/users/domain/entities/user.entity";

@Injectable()
export class UserRepository {

  constructor(
    @InjectRepository(User)
    private readonly orm: Repository<User>,
  ) { }

  async create(user: User): Promise<User> {
    return await this.orm.save(user);
  }

  async update(user: User): Promise<User> {
    return await this.orm.save(user);
  }

  async findById(id: string): Promise<User|null> {
    return await this.orm.findOne({
        where: { id },
        relations: {
          gameList: {
            game: true,
            rank: true
          },
        },
      });
  }

  async findByDiscordId(id: string): Promise<User|null> {
    return await this.orm.findOne({
      where: {
        discord_id: id
      }
    })
  }
}