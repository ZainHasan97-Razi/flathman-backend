import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  IsObject,
  IsMongoId,
  IsBoolean,
  MinLength,
} from 'class-validator';

export class CreateOpponentTeamDto {
  @IsMongoId({ message: 'Invalid user!' })
  @IsNotEmpty({ message: 'User is required!' })
  userId;

  @IsString({ message: 'Team name is required!' })
  @IsNotEmpty({ message: 'Team name is required!' })
  teamName: string;

  @IsString({ message: 'Team nick name is required!' })
  @IsNotEmpty({ message: 'Team nick name is required!' })
  teamNickName: string;

  @IsString({ message: 'Coach name is required!' })
  @IsNotEmpty({ message: 'Coacg name is required!' })
  coachName: string;

  @IsNotEmpty({ message: 'Coach email is required!' })
  @IsEmail({ message: 'Invalid coach email!' })
  coachEmail: string;

  @IsNotEmpty({ message: 'Coach phone is required!' })
  @IsString({ message: 'Invalid coach phone!' })
  @MaxLength(10, { message: 'Coach phone should be of 10 digits' })
  @MinLength(10, { message: 'Coach phone should be of 10 digits' })
  coachCell: string;

  @IsBoolean()
  isConference: boolean;

  @IsMongoId({ message: 'Invalid team owner!' })
  @IsNotEmpty({ message: 'Team owner is required!' })
  teamOwner;
}
