import { Injectable } from "@nestjs/common";
import { RankRepository } from "@app/games/domain/repositories/rank.repository";
import { plainToInstance } from "class-transformer";
import { Rank } from "@app/games/domain/entities/rank.entity";
import { CreateRankDto } from "@app/games/dto/rank/create-rank.dto";

@Injectable()
export class RankService {

  constructor(
    private readonly repo: RankRepository
  ) { }

  async create(rank: CreateRankDto): Promise<Rank> {
    return this.repo.create(plainToInstance(Rank, rank));
  }
}