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

  async add(newGame: Gamelist): Promise<Gamelist> {
    return await this.orm.save(newGame)
  }

}