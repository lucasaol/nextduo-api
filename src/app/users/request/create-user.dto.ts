import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @MaxLength(255)
  avatar: string;

  @IsOptional()
  @MaxLength(255)
  bio: string;

}