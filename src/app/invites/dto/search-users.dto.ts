import { Transform } from "class-transformer";
import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { LastLoginFilter } from "@app/invites/enums/last-login-filter.enum";
import { RankIdsValidator } from "@app/invites/helpers/validators/rank-ids.validator";

export class SearchUsersDto {

  @IsUUID()
  @IsOptional()
  game_id?: string;

  @IsOptional()
  @RankIdsValidator()
  @Transform(({value}) => Array.isArray(value) ? value : [value])
  rank_ids?: string[];

  @IsOptional()
  @IsEnum(LastLoginFilter)
  last_login?: LastLoginFilter;

  @IsOptional()
  cursor?: string;
}