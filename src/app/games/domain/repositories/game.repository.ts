import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "@app/games/domain/entities/game.entity";
import { Repository } from "typeorm";

@Injectable()
export class GameRepository {

  constructor(
    @InjectRepository(Game)
    private readonly orm: Repository<Game>,
  ) { }

  async findAll(): Promise<Game[]> {
    return await this.orm.find();
  }

  async findById(id: string): Promise<Game|null> {
    return await this.orm.findOne({
      where: { id }
    });
  }

  async create(game: Game): Promise<Game> {
    return await this.orm.save(game);
  }

  async update(game: Game): Promise<Game> {
    return await this.orm.save(game);
  }

}