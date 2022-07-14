import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
  IsMongoId,
} from 'class-validator';

export class CreateSubscriptionDto {
  // @IsNotEmpty()
  // @IsString()
  // subscriptionId: string;

  @IsMongoId()
  @IsNotEmpty()
  userId;

  @IsBoolean()
  isExpired: boolean;

  // like one day subscription or summer season etc
  @IsMongoId()
  subscriptionType;

  @IsNumber()
  @IsNotEmpty()
  startTime: number;

  @IsNumber()
  @IsNotEmpty()
  endTime: number;

  @IsNumber()
  @IsNotEmpty()
  timesUsed: number;
}
