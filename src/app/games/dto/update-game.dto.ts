import { IsOptional, IsUrl, MaxLength } from "class-validator";

export class UpdateGameDto {

  @IsOptional()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @MaxLength(255)
  @IsUrl()
  image: string;

}