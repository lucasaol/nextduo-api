import { Injectable } from "@nestjs/common";
import { RankRepository } from "@app/games/domain/repositories/rank.repository";
import { plainToInstance } from "class-transformer";
import { Rank } from "@app/games/domain/entities/rank.entity";
import { CreateRankDto } from "@app/games/dto/create-rank.dto";

@Injectable()
export class RankService {

  constructor(
    private readonly repo: RankRepository
  ) { }

  async create(rank: CreateRankDto): Promise<Rank> {
    return this.repo.create(plainToInstance(Rank, rank));
  }

  async findByGameId(gameId: string): Promise<Rank[]> {
    return this.repo.findByGameId(gameId);
  }

  async saveMany(ranks: Rank[]): Promise<Rank[]> {
    return this.repo.saveMany(ranks);
  }
}