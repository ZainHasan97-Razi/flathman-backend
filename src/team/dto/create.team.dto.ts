// import { BaseProjectDto } from './base-project.dto';
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
} from 'class-validator';

export class CreateTeamDto {
  @IsMongoId()
  userId;

  @IsString()
  teamName: string;

  @IsString()
  teamNickName: string;

  @IsString()
  teamColor: string;

  @IsString()
  coachCell: string;

  @IsMongoId()
  teamOwner;

  // @IsString()
  // teamGender: string;

  // @IsObject()
  // gameRules: object;

  // @IsArray()
  // @ArrayMaxSize(11)
  // @ArrayMinSize(0)
  // players: Array<mongoose.Schema.Types.ObjectId>;
  // players: any;
}
