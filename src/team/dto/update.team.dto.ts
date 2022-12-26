import { IsNotEmpty, IsEmail, IsString, IsMongoId } from 'class-validator';

export class UpdateTeamDto {
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

  @IsMongoId()
  teamOwner;
}
