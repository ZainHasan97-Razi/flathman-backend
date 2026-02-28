import {
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsString,
  IsEmail,
} from 'class-validator';

export class UpdateTeamDto {
  @IsMongoId({ message: 'Invalid team!' })
  @IsNotEmpty({ message: 'Invalid team!' })
  teamId;

  @IsOptional()
  @IsString({ message: 'Team name is required!' })
  teamName?: string;

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
}
