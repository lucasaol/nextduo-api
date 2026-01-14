import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateInviteDto {

  @IsUUID()
  user_id: string;

  @IsUUID()
  game_id: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  message?: string;
}