import { IsString, IsNumber, IsMongoId } from 'class-validator';
import { MongoIdType } from 'src/common/common.types';
import { IsDateFormat, IsTimeFormat, TransformToTimestamp } from 'src/decorators/date-time.decorator';

export class UpdateScheduleGameDto {
  @IsMongoId()
  opponentTeam: MongoIdType;

  @IsDateFormat({ message: 'Invalid date format. Expected format: MM-DD-YYYY' })
  date: string;

  @IsTimeFormat({ message: 'Invalid time format. Expected format: HH:MM' })
  time: string;

  // @IsNumber()
  @TransformToTimestamp() // seconds
  scheduleDateTime: number;

  @IsString()
  home: string;

  @IsString()
  away: string;

  @IsString()
  conference: boolean;
}
