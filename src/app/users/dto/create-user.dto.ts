import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email: string | null;

  @IsOptional()
  @MaxLength(255)
  avatar: string | null;

  @IsOptional()
  @MaxLength(255)
  bio: string | null;

  @IsNotEmpty()
  @MaxLength(50)
  discord_id: string;

}