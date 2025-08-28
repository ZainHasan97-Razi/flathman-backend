import { IsEmail, IsEnum, IsString } from "class-validator";
// import { ShareAccountStatusEnum, ShareAccountStatusEnumType } from "../share-account.model";


export class SendDto {
  @IsEmail()
  guestEmail: string;

  @IsString()
  role: string;

  // @IsEnum(ShareAccountStatusEnum)
  // status: ShareAccountStatusEnumType;
}