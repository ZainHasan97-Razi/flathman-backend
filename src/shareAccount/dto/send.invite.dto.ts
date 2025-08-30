import { IsArray, IsEmail, IsMongoId, IsString } from "class-validator";
export class SendInviteDto {
  @IsEmail()
  guestEmail: string;

  @IsString()
  role: string;

  @IsArray()
  @IsMongoId({ each: true })
  teams: string[];
}