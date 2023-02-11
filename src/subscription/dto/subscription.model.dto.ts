import { DefaultValuePipe } from '@nestjs/common';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
  IsMongoId,
} from 'class-validator';

export class SubscriptionModelDto {
  // @IsNotEmpty()
  // @IsString()
  // subscriptionId: string;

  @IsMongoId()
  @IsNotEmpty()
  userId;

  @IsMongoId()
  @IsNotEmpty()
  teamId;

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
  timesAllowed: number; // Agr subs type number of times use ha tw times allowed define honge min=1 tak wrna 0 hoga ye

  @IsNumber()
  @IsNotEmpty()
  timesUsed: number;
}
