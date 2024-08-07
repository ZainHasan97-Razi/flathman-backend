import { IsString, IsMongoId, IsBoolean } from 'class-validator';
import { MongoIdType } from 'src/common/common.types';
import {
  IsDateFormat,
  IsTimeFormat,
  TransformToTimestamp,
} from 'src/decorators/date-time.decorator';

export class UpdateScheduleGameDto {
  @IsMongoId()
  opponentTeam: MongoIdType;

  @IsDateFormat({ message: 'Invalid date format. Expected format: MM-DD-YYYY' })
  date: string;

  @IsTimeFormat({ message: 'Invalid time format. Expected format: HH:MM' })
  time: string;

  // @IsNumber()
  @TransformToTimestamp() // seconds
  effectiveDateTime: number;

  @IsString()
  homeTeam: string;

  @IsString()
  awayTeam: string;

  @IsBoolean()
  conference: boolean;
}
