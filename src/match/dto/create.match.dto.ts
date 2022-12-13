// import { BaseProjectDto } from './base-project.dto';
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsArray,
  IsObject,
  IsBoolean,
  IsMongoId,
} from 'class-validator';

export class CreateMatchDto {
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
