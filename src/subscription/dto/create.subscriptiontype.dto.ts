import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSubscriptionTypeDto {
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
