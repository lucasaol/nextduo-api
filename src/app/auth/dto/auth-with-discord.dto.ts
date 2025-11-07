import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class AuthWithDiscordDto {

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  code: string;
}