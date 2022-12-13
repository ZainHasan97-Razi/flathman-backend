// import { BaseProjectDto } from './base-project.dto';
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsArray,
  IsObject,
  IsMongoId,
  IsBoolean,
} from 'class-validator';

export class CreateOpponentPlayerDto {
  // @IsMongoId()
  // _id;

  @IsMongoId()
  @IsNotEmpty()
  teamId;

  @IsString()
  @IsNotEmpty()
  playerName: string;

  @IsBoolean()
  isCaptain: boolean;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsNumber()
  @IsNotEmpty()
  playerNumber: string;
}
