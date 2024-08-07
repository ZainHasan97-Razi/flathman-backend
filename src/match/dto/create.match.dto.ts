import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsObject,
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { MongoIdType } from 'src/common/common.types';
import {
  IsDateFormat,
  IsTimeFormat,
  TransformToTimestamp,
} from 'src/decorators/date-time.decorator';
import {
  GameResultEnum,
  GameResultEnumType,
  GameStatusEnum,
  GameStatusEnumType,
} from '../match.model';
import { ValidateDataUponMatchStatus } from 'src/decorators/match-data-validator.decorator';

export class CreateMatchDto {
  @IsMongoId()
  userId: MongoIdType;

  @IsOptional()
  @IsObject()
  teamA: Record<string, any>;

  @IsOptional()
  @IsObject()
  teamB: Record<string, any>;

  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  general: Record<string, any>;

  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  rules: Record<string, any>;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  activityLog: Array<object>;

  @IsEnum(GameStatusEnum)
  @ValidateDataUponMatchStatus()
  gameStatus: GameStatusEnumType;

  @IsEnum(GameResultEnum)
  gameResult: GameResultEnumType;

  // For schedule game options
  //
  @IsOptional()
  @IsDateFormat({ message: 'Invalid date format. Expected format: MM-DD-YYYY' })
  date: string;

  @IsOptional()
  @IsTimeFormat({ message: 'Invalid time format. Expected format: HH:MM' })
  time: string;

  // @IsNumber()
  @IsOptional()
  @TransformToTimestamp() // seconds
  effectiveDateTime: number;

  @IsOptional()
  @IsString()
  homeTeam: string; // team name

  @IsOptional()
  @IsString()
  awayTeam: string; // team name

  @IsOptional()
  @IsBoolean()
  conference: boolean;
}
