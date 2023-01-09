import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsMongoId,
  IsBoolean,
} from 'class-validator';

export class UpdateOppTeamDto {
  @IsMongoId()
  @IsNotEmpty()
  teamId;

  @IsString() // Because Gene said that team name won't be changeable
  teamName: string;

  @IsString()
  teamNickName: string;

  @IsString()
  coachName: string;

  @IsEmail()
  coachEmail: string;

  @IsString()
  coachCell: string;

  @IsBoolean()
  isConference: boolean;

  @IsMongoId()
  teamOwner;
}
