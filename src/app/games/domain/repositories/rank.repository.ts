import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Rank } from "@app/games/domain/entities/rank.entity";
import { Repository } from "typeorm";

@Injectable()
export class RankRepository {

  constructor(
    @InjectRepository(Rank)
    private readonly orm: Repository<Rank>)
  { }

  async create(gameId: string, rank: Rank): Promise<Rank> {
    return await this.orm.save({
      ...rank,
      game_id: gameId,
    });
  }

  async findByGameId(gameId: string): Promise<Rank[]> {
    return await this.orm.find({
      where: { game_id: gameId},
      order: { order: 'ASC' }
    });
  }

  async saveMany(ranks: Rank[]): Promise<Rank[]> {
    return await this.orm.save(ranks);
  }
}