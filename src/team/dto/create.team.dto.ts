// import { BaseProjectDto } from './base-project.dto';
import { IsEmail, IsString, IsMongoId } from 'class-validator';

export class CreateTeamDto {
  @IsMongoId()
  userId;

  @IsString()
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
