import { IsNotEmpty, IsUUID } from "class-validator";

export class AddGameToListDto {

  @IsNotEmpty()
  @IsUUID()
  rank_id: string;
}