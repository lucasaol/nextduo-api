import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Gamelist } from "@app/users/domain/entities/gamelist.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class GamelistRepository {

  constructor(
    @InjectRepository(Gamelist)
    private readonly orm: Repository<Gamelist>
  ) { }

  async findByUserAndGameIds(userId: string, gameId: string): Promise<Gamelist|null> {
    return await this.orm.findOne({
      where: {
        user_id: userId,
        game_id: gameId
      }
    })
  }

  async add(newGame: Gamelist): Promise<Gamelist> {
    return await this.orm.save(newGame)
  }

  async remove(id: string) {
    await this.orm.delete(id);
  }

}