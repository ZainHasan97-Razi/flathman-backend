import { IsString, IsNumber, IsMongoId } from 'class-validator';
import { MongoIdType } from 'src/common/common.types';

export class UpdateScheduleGameDto {
  @IsMongoId()
  opponentTeam: MongoIdType;

  @IsNumber()
  scheduleDateTime: number;

  @IsString()
  home: string;

  @IsString()
  away: string;

  @IsString()
  conference: boolean;
}
