// import { BaseProjectDto } from './base-project.dto';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsMongoId,
} from 'class-validator';

export class UpdateSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  subscriptionId;

  // @IsMongoId()
  // userId;

  @IsBoolean()
  isExpired: boolean;

  @IsString() // like one day or summer etc
  subscriptionType: string;

  @IsNumber()
  startTime: number;

  @IsNumber()
  endTime: number;
}

export class UpdateSubscriptionWhileGetDto {
  @IsNotEmpty()
  _id?;

  // @IsNotEmpty()
  @IsString()
  subscriptionId;

  // This is just to set a condition while updating during getApi by default
  @IsString()
  expired: string;
}

export class UpdateSubscriptionOnEndGameDto {
  // We increase usage count on end game
  @IsNotEmpty()
  _id?;
}
