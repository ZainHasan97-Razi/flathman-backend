// import { BaseProjectDto } from './base-project.dto';
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  IsObject,
  IsMongoId,
  IsBoolean,
} from 'class-validator';

export class CreateOpponentTeamDto {
  @IsMongoId()
  userId;

  @IsString()
  teamName: string;

  @IsString()
  teamNickName: string;

  @IsString()
  teamColor: string;

  @IsString()
  coachName: string;

  @IsEmail()
  coachEmail: string;

  @IsString()
  coachCell: string;

  @IsBoolean()
  isConference: boolean;

  @IsMongoId()
  teamOwner;
}
