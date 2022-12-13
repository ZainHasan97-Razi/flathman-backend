// import { BaseProjectDto } from './base-project.dto';
import {
  IsArray,
  IsObject,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateMatchDto {
  @IsMongoId()
  matchId;

  @IsObject()
  winnerTeam;

  @IsObject()
  otherTeam;

  // @IsNotEmpty()
  @IsObject()
  general;

  // @IsNotEmpty()
  @IsObject()
  rules;

  // @IsNotEmpty()
  @IsArray()
  activityLog;

  @IsNotEmpty()
  @IsString()
  status: string;
}
