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
  IsOptional,
} from 'class-validator';

export class CreatePlayerDto {
  @IsMongoId({ message: 'Invalid team!' })
  teamId;

  // @IsString({ message: 'Player name is required!' })
  @IsNotEmpty({ message: 'Player name is required!' })
  playerName: string;

  // @IsEmail({ message: 'Invalid email format!' })
  // @IsNotEmpty({ message: 'Email is required!' })
  // email: string;
  // @IsOptional()
  // @IsEmail()
  email?: string;

  // @IsOptional()
  // @IsBoolean()
  isCaptain?: boolean;

  // @IsString({ message: 'Home Jersey is required!' })
  @IsNotEmpty({ message: 'Home Jersey is required!' })
  homeJersey: string;

  // @IsString({ message: 'Away Jersey is required!' })
  @IsNotEmpty({ message: 'Away Jersey is required!' })
  awayJersey: string;

  // @IsOptional()
  // @IsString({ message: 'Position is required!' })
  @IsNotEmpty({ message: 'Position1 is required!' })
  position1: string;

  // @IsOptional()
  // @IsString({ message: 'Position is required!' })
  // @IsNotEmpty({ message: 'Position is required!' })
  position2?: string;

  // @IsOptional()
  // @IsString({ message: 'Height is required!' })
  // @IsNotEmpty({ message: 'Height is required!' })
  height?: string;

  // @IsOptional()
  // @IsString({ message: 'Weight is required!' })
  // @IsNotEmpty({ message: 'Weight is required!' })
  weight?: string;

  // @IsOptional()
  // @IsString({ message: 'Grade is required!' })
  // @IsNotEmpty({ message: 'Grade is required!' })
  grade?: string;

  // @IsOptional()
  // @IsNotEmpty({ message: 'Phone number is required!' })
  // @IsString({ message: 'Phone number is required!' })
  // @MaxLength(10, { message: 'Phone number should be of 10 digits' })
  // @MinLength(10, { message: 'Phone number should be of 10 digits' })
  phone?: string;
}
