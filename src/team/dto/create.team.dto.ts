// import { BaseProjectDto } from './base-project.dto';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
} from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty({ message: 'Team name is required!' })
  @IsString({ message: 'Team name is required!' })
  teamName: string;

  @IsOptional()
  @IsString()
  league?: string;

  @IsOptional()
  @IsString()
  organization?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  coachName?: string;

  @IsOptional()
  @IsEmail({ message: 'Invalid coach email!' })
  coachEmail?: string;

  @IsOptional()
  @IsString()
  coachCell?: string; 

  @IsMongoId({ message: 'Invalid team owner!' })
  // @IsNotEmpty({ message: 'Team owner is required!' })
  teamOwner;

  @IsMongoId({ message: 'Game rule is required!' })
  gameRules;
}
