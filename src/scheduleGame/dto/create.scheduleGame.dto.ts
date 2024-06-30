import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsMongoId,
  IsBoolean,
} from 'class-validator';
import {
  ScheduleStatusEnum,
  ScheduleStatusEnumType,
} from '../scheduleGame.schema';
import { MongoIdType } from 'src/common/common.types';
import { IsDateFormat, IsTimeFormat, TransformToTimestamp } from 'src/decorators/date-time.decorator';

export class CreateScheduleGameDto {
  @IsMongoId()
  userId: MongoIdType;

  @IsMongoId()
  teamId: MongoIdType;

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
  homeTeam: string;

  @IsString()
  awayTeam: string;

  @IsBoolean()
  conference: boolean;

  @IsOptional()
  @IsEnum(ScheduleStatusEnum)
  status: ScheduleStatusEnumType;
}
