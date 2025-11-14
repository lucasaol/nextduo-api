import { IsNotEmpty, IsUUID } from "class-validator";

export class UpdateGameInListDto {

  @IsNotEmpty()
  @IsUUID()
  rank_id: string;
}