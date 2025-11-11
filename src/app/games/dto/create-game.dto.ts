import { IsNotEmpty, IsUrl, MaxLength } from "class-validator";

export class CreateGameDto {

  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @MaxLength(255)
  @IsUrl()
  image: string;

}