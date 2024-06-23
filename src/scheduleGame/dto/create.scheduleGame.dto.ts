import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import {
  ScheduleStatusEnum,
  ScheduleStatusEnumType,
} from '../scheduleGame.schema';
import { MongoIdType } from 'src/common/common.types';

export class CreateScheduleGameDto {
  @IsMongoId()
  userId: MongoIdType;

  @IsMongoId()
  teamId: MongoIdType;

  @IsMongoId()
  opponentTeam: string;

  @IsNumber()
  scheduleDateTime: number;

  @IsString()
  home: string;

  @IsString()
  away: string;

  @IsString()
  conference: boolean;

  @IsOptional()
  @IsEnum(ScheduleStatusEnum)
  status: ScheduleStatusEnumType;
}
