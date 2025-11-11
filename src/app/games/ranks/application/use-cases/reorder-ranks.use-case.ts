import { BadRequestException, Injectable } from "@nestjs/common";
import { RankService } from "@app/games/ranks/application/services/rank.service";
import { ReorderRanksDto } from "@app/games/ranks/dto/reorder-ranks.dto";
import { Rank } from "@app/games/ranks/domain/entities/rank.entity";

@Injectable()
export class ReorderRanksUseCase {

  constructor(
    private readonly service: RankService
  ) { }

  async execute(ranks: Rank[], dto: ReorderRanksDto) {
    const rankMap = new Map(ranks.map(r => [r.id, r]));

    dto.ranks.forEach((id, index) => {
      const rank = rankMap.get(id);
      if (!rank) throw new BadRequestException(`Rank ${id} not found in this game`);
      rank.order = index;
    });

    await this.service.saveMany([...rankMap.values()]);
  }
}