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

// class TeamDetailDto {
//   @IsNotEmpty()
//   @IsString()
//   teamName: string;

//   @IsNotEmpty()
//   @IsNumber()
//   goals: number;

//   @IsNotEmpty()
//   @IsNumber()
//   penalties: number;

//   @IsNotEmpty()
//   @IsString()
//   goalie: string;

//   @IsNotEmpty()
//   @IsString()
//   inHomePlayer: string;

//   @IsNotEmpty()
//   @IsBoolean()
//   isHomeTeam: boolean;
// }

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
}
