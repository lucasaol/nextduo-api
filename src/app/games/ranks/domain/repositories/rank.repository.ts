import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Rank } from "@app/games/ranks/domain/entities/rank.entity";
import { Repository } from "typeorm";

@Injectable()
export class RankRepository {

  constructor(
    @InjectRepository(Rank)
    private readonly orm: Repository<Rank>)
  { }

  async create(rank: Rank): Promise<Rank> {
    return await this.orm.save(rank);
  }
}