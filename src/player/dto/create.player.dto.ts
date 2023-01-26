// import { BaseProjectDto } from './base-project.dto';
import {
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsArray,
  IsObject,
  IsMongoId,
  IsBoolean,
  buildMessage,
} from 'class-validator';

export class CreatePlayerDto {
  // @IsMongoId()
  // _id;

  @IsMongoId()
  @IsNotEmpty()
  teamId;

  @IsString()
  @IsNotEmpty()
  playerName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  isCaptain: boolean;

  @IsString()
  @IsNotEmpty()
  homeJersey: string;

  @IsString()
  @IsNotEmpty()
  awayJersey: string;

  @IsString()
  @IsNotEmpty()
  position1: string;

  @IsString()
  @IsNotEmpty()
  position2: string;

  @IsString()
  @IsNotEmpty()
  height: string;

  @IsString()
  @IsNotEmpty()
  weight: string;

  @IsString()
  @IsNotEmpty()
  grade: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  phone: string;
}
