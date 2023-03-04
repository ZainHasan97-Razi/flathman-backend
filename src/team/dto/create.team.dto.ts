// import { BaseProjectDto } from './base-project.dto';
import {
  IsEmail,
  IsString,
  IsMongoId,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateTeamDto {
  // @IsString({ message: 'Team name is required!' })
  @IsNotEmpty({ message: 'Team name is required!' })
  teamName: string;

  // @IsString({ message: 'Team nick name is required!' })
  @IsNotEmpty({ message: 'Team nick name is required!' })
  teamNickName: string;

  // @IsString({ message: 'Coach name is required!' })
  @IsNotEmpty({ message: 'Coacg name is required!' })
  coachName: string;

  // @IsNotEmpty({ message: 'Coach email is required!' })
  @IsEmail({ message: 'Invalid coach email!' })
  coachEmail: string;

  @IsNotEmpty({ message: 'Coach phone is required!' })
  @IsString({ message: 'Invalid coach phone!' })
  @MaxLength(10, { message: 'Coach phone should be of 10 digits' })
  @MinLength(10, { message: 'Coach phone should be of 10 digits' })
  coachCell: string;

  @IsMongoId({ message: 'Invalid team owner!' })
  // @IsNotEmpty({ message: 'Team owner is required!' })
  teamOwner;
}
