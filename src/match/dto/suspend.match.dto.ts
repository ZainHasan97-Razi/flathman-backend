// import { BaseProjectDto } from './base-project.dto';
import {
  MaxLength,
  IsNotEmpty,
  IsArray,
  IsObject,
  IsBoolean,
  IsMongoId,
  IsString,
} from 'class-validator';

export class SuspendMatchDto {
  @IsMongoId()
  userId;

  @IsObject()
  winnerTeam;

  @IsObject()
  otherTeam;

  @IsNotEmpty()
  @IsObject()
  general;

  @IsNotEmpty()
  @IsObject()
  rules;

  @IsNotEmpty()
  @IsArray()
  activityLog;

  @IsNotEmpty()
  @IsString()
  status: string;
}
