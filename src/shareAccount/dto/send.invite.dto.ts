import { Type } from "class-transformer";
import { IsArray, IsEmail, IsMongoId, IsString, ValidateNested } from "class-validator";
import { MongoIdType } from "src/common/common.types";

export class InvitedTeamsDto {
  @IsMongoId()
  teamId: MongoIdType

  @IsString()
  role: string;
}
export class SendInviteDto {
  @IsEmail()
  guestEmail: string;

  @IsString()
  guestName: string;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => InvitedTeamsDto)
  teams: InvitedTeamsDto[];
}