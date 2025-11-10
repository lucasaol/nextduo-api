import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Game } from "@app/games/domain/game.entity";

@Injectable()
export class GameRepository {

  constructor(
    @InjectRepository(Game)
    private readonly orm: Repository<Game>,
  ) { }

  async findAll(): Promise<Game[]> {
    return await this.orm.find();
  }

}