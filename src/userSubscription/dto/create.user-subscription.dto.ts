// import { BaseProjectDto } from './base-project.dto';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsEnum,
  Min,
  IsOptional,
  IsMongoId,
  IsObject,
} from 'class-validator';
import { MongoIdType } from 'src/common/types/mongoid.type';
import {
  PlatformEnum,
  SubscriptionStatusEnum,
  SubscriptionTypeEnum,
} from 'src/constants/enums';

export class CreateUserSubscriptionDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: MongoIdType;

  // @IsEnum(SubscriptionStatusEnum)
  // status: keyof typeof SubscriptionStatusEnum;

  @IsEnum(PlatformEnum)
  platform: keyof typeof PlatformEnum;

  // @IsEnum(SubscriptionTypeEnum) // duplicate
  // type: keyof typeof SubscriptionTypeEnum;

  @IsNotEmpty()
  @IsMongoId()
  bundle: MongoIdType;

  @IsNotEmpty()
  @IsObject()
  recipt: object;
}
