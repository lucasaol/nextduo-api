import { IsNotEmpty, IsUrl, MaxLength } from "class-validator";

export class CreateRankDto {

  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @MaxLength(255)
  @IsUrl()
  icon: string;

}