import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsMongoId,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class UpdateTeamDto {
  @IsMongoId({ message: 'Invalid team!' })
  @IsNotEmpty({ message: 'Invalid team!' })
  teamId;

  // @IsOptional()
  @IsString({ message: 'Team name is required!' })
  @IsNotEmpty({ message: 'Team name is required!' }) // Because Gene said that team name won't be changeable
  teamName: string;

  @IsOptional()
  @IsString({ message: 'Team nick name is required!' })
  @IsNotEmpty({ message: 'Team nick name is required!' })
  teamNickName?: string;

  @IsOptional()
  @IsString({ message: 'Coach name is required!' })
  @IsNotEmpty({ message: 'Coacg name is required!' })
  coachName?: string;

  @IsOptional()
  @IsEmail({ message: 'Invalid coach email!' })
  coachEmail?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Coach phone is required!' })
  @IsString({ message: 'Invalid coach phone!' })
  @MaxLength(10, { message: 'Coach phone should be of 10 digits' })
  @MinLength(10, { message: 'Coach phone should be of 10 digits' })
  coachCell?: string;

  // @IsMongoId({ message: 'Invalid team owner!' })
  // @IsNotEmpty({ message: 'Team owner is required!' })
  // teamOwner;
}
