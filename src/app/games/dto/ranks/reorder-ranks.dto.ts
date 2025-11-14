import { ArrayNotEmpty, IsArray, IsUUID } from "class-validator";

export class ReorderRanksDto {

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  ranks: string[];
}