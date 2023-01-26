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

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  coachCell: string;

  @IsBoolean()
  isConference: boolean;

  @IsMongoId()
  teamOwner;
}
