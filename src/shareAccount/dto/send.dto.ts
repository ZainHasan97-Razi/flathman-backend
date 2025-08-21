import { IsEmail, IsEnum } from "class-validator";
// import { ShareAccountStatusEnum, ShareAccountStatusEnumType } from "../share-account.model";


export class SendDto {
  @IsEmail()
  guestEmail: string;

  // @IsEnum(ShareAccountStatusEnum)
  // status: ShareAccountStatusEnumType;
}