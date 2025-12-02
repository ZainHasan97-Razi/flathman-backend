import { Type } from "class-transformer";
import { IsArray, IsEmail, IsOptional, IsString, ValidateNested } from "class-validator";
import { InvitedTeamsDto } from "./send.invite.dto";

export class UpdateInviteDto {
  @IsOptional()
  @IsString()
  guestName: string;

  @IsOptional()
  @IsString()
  guestFirstName: string;

  @IsOptional()
  @IsString()
  guestLastName: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => InvitedTeamsDto)
  teams: InvitedTeamsDto[];
}