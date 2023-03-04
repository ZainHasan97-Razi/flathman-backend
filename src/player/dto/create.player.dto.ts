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
} from 'class-validator';

export class CreatePlayerDto {
  @IsMongoId({ message: 'Invalid team!' })
  @IsNotEmpty({ message: 'Invalid team!' })
  teamId;

  @IsString({ message: 'Player name is required!' })
  @IsNotEmpty({ message: 'Player name is required!' })
  playerName: string;

  // @IsEmail({ message: 'Invalid email format!' })
  // @IsNotEmpty({ message: 'Email is required!' })
  email: string;

  // @IsBoolean()
  isCaptain: boolean;

  @IsString({ message: 'Home Jersey is required!' })
  @IsNotEmpty({ message: 'Home Jersey is required!' })
  homeJersey: string;

  @IsString({ message: 'Away Jersey is required!' })
  @IsNotEmpty({ message: 'Away Jersey is required!' })
  awayJersey: string;

  @IsString({ message: 'Position is required!' })
  @IsNotEmpty({ message: 'Position is required!' })
  position1: string;

  @IsString({ message: 'Position is required!' })
  @IsNotEmpty({ message: 'Position is required!' })
  position2: string;

  // @IsString({ message: 'Height is required!' })
  // @IsNotEmpty({ message: 'Height is required!' })
  height: string;

  // @IsString({ message: 'Weight is required!' })
  // @IsNotEmpty({ message: 'Weight is required!' })
  weight: string;

  // @IsString({ message: 'Grade is required!' })
  // @IsNotEmpty({ message: 'Grade is required!' })
  grade: string;

  // @IsNotEmpty({ message: 'Phone number is required!' })
  // @IsString({ message: 'Phone number is required!' })
  // @MaxLength(10, { message: 'Phone number should be of 10 digits' })
  // @MinLength(10, { message: 'Phone number should be of 10 digits' })
  phone: string;
}
