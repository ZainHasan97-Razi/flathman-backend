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

export class CreateScheduleGameDto {
  @IsMongoId()
  userId: MongoIdType;

  @IsMongoId()
  teamId: MongoIdType;

  @IsMongoId()
  opponentTeam: MongoIdType;

  @IsNumber()
  scheduleDateTime: number;

  @IsString()
  home: string;

  @IsString()
  away: string;

  @IsBoolean()
  conference: boolean;

  @IsOptional()
  @IsEnum(ScheduleStatusEnum)
  status: ScheduleStatusEnumType;
}
