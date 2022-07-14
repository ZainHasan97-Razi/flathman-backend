// import { BaseProjectDto } from './base-project.dto';
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
  IsMongoId,
} from 'class-validator';

export class UpdatePlayerDto {
  @IsMongoId()
  @IsNotEmpty()
  playerId: string;

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

  @IsNumber()
  @IsNotEmpty()
  phone: number;
}
