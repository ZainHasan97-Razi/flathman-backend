// import { BaseProjectDto } from './base-project.dto';
import {
  IsEmail,
  IsString,
  IsMongoId,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateTeamDto {
  // @IsString({ message: 'Team name is required!' })
  @IsNotEmpty({ message: 'Team name is required!' })
  teamName: string;

  // @IsString({ message: 'Team nick name is required!' })
  // @IsOptional()
  // @IsNotEmpty({ message: 'Team nick name is required!' })
  teamNickName?: string;

  // // @IsString({ message: 'Coach name is required!' })
  // @IsOptional()
  // @IsNotEmpty({ message: 'Coacg name is required!' })
  coachName?: string;

  // @IsNotEmpty({ message: 'Coach email is required!' })
  // @IsOptional()
  // @IsEmail({ message: 'Invalid coach email!' })
  coachEmail?: string;

  // @IsOptional()
  // @IsNotEmpty({ message: 'Coach phone is required!' })
  // @IsString({ message: 'Invalid coach phone!' })
  // @MaxLength(10, { message: 'Coach phone should be of 10 digits' })
  // @MinLength(10, { message: 'Coach phone should be of 10 digits' })
  coachCell?: string;

  @IsMongoId({ message: 'Invalid team owner!' })
  // @IsNotEmpty({ message: 'Team owner is required!' })
  teamOwner;

  @IsMongoId({ message: 'Game rule is required!' })
  gameRules;
}
