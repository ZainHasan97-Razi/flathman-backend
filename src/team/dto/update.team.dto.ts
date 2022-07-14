import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  IsMongoId,
} from 'class-validator';

export class UpdateTeamDto {
  @IsMongoId()
  @IsNotEmpty()
  teamId;

  @IsString() // Because Gene said that team name won't be changeable
  teamName: string;

  @IsString()
  teamNickName: string;

  @IsString()
  teamColor: string;

  @IsString()
  coachCell: string;

  @IsMongoId()
  teamOwner;

  // @IsArray()
  // @ArrayMaxSize(11)
  // @ArrayMinSize(0)
  // players: Array<mongoose.Schema.Types.ObjectId>; // Ye pata nhi kia bakwas
  // players: any;
}
