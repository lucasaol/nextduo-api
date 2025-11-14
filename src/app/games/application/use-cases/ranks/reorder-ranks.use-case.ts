import { BadRequestException, Injectable } from "@nestjs/common";
import { RankService } from "@app/games/application/services/rank.service";
import { ReorderRanksDto } from "@app/games/dto/ranks/reorder-ranks.dto";
import { Rank } from "@app/games/domain/entities/rank.entity";

@Injectable()
export class ReorderRanksUseCase {

  constructor(
    private readonly service: RankService
  ) { }

  async execute(ranks: Rank[], dto: ReorderRanksDto) {
    if (dto.ranks.length !== ranks.length) {
      throw new BadRequestException('All ranks must be provided');
    } else if(new Set(dto.ranks).size !== dto.ranks.length) {
      throw new BadRequestException('Duplicated rank IDs');
    }

    const rankMap = new Map(ranks.map(r => [r.id, r]));

    dto.ranks.forEach((id, index) => {
      const rank = rankMap.get(id);
      if (!rank) throw new BadRequestException(`Rank ${id} not found in this game`);
      rank.order = index;
    });

    await this.service.saveMany([...rankMap.values()]);
  }
}