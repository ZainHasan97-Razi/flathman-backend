import { IsEnum, IsMongoId } from "class-validator";
import { ShareAccountStatusEnum, ShareAccountStatusEnumType } from "../share-account.model";
import { MongoIdType } from "src/common/common.types";


export class UpdateShareAccountStatusDto {
  @IsMongoId()
  inviteId: MongoIdType;

  @IsEnum(ShareAccountStatusEnum)
  status: ShareAccountStatusEnumType;
}

export class AcceptInviteDto {
  @IsMongoId()
  inviteId: MongoIdType;
}