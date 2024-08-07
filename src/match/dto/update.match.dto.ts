// import { BaseProjectDto } from './base-project.dto';
import {
  IsArray,
  IsObject,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { GameResultEnum, GameResultEnumType, GameStatusEnum, GameStatusEnumType } from '../match.model';
import { IsDateFormat, IsTimeFormat, TransformToTimestamp } from 'src/decorators/date-time.decorator';
import { ValidateDataUponMatchStatus } from 'src/decorators/match-data-validator.decorator';

export class UpdateMatchDto {
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

  @IsOptional()
  @IsEnum(GameStatusEnum)
  @ValidateDataUponMatchStatus()
  gameStatus: GameStatusEnumType;

  @IsOptional()
  @IsEnum(GameResultEnum)
  gameResult: GameResultEnumType;

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
