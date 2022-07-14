import { IsNotEmpty, IsString, IsNumber, IsMongoId } from 'class-validator';

export class UpdateSubscriptionTypeDto {
  @IsMongoId()
  subsciptionTypeId;

  @IsString()
  @IsNotEmpty()
  subscriptionName: string;

  @IsString()
  @IsNotEmpty()
  cost: string;

  @IsString()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  durationDays: number;
}
