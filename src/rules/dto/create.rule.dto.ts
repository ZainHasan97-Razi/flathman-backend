// import { BaseProjectDto } from './base-project.dto';
import { IsString, IsNumber, IsEnum, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { RuleTypeEnum, RuleTypeEnumType, TimeoutsUnitEnum, TimeoutsUnitEnumType } from '../rule.model';
import { Type } from 'class-transformer';

export class TimeoutConfigDto {
  @IsEnum(TimeoutsUnitEnum)
  unit: TimeoutsUnitEnumType;

  @IsNumber()
  value: number;
}

export class CreateRuleDto {
  @IsString()
  ruleName: string;

  @IsString()
  ruleId: string;

  // @IsString()
  mercyRuleLimit: string;

  @IsString()
  gender: string;

  @IsEnum(RuleTypeEnum)
  type: RuleTypeEnumType;

  // Periods per game
  @IsNumber()
  gamePeriods: number;

  // Minutes per periods
  @IsNumber()
  periodDuration: number;

  // Minutes between periods
  @IsNumber()
  gapBetweenPeriods: number;

  // Minutes between halves
  @IsNumber()
  gapBetweenHalves: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => TimeoutConfigDto)
  timeoutConfig: TimeoutConfigDto[]

  // Number of timeouts a team gets per overtime period
  @IsNumber()
  timeoutsInOvertimePeriod: number;

  // Max number of overtime periods
  @IsNumber()
  maxOvertimePeriods: number;

  // Length of an overtime period in minutes
  @IsNumber()
  overtimePeriodDuration: number;

  // Goal differential for running clock
  // @IsNumber()
  goalDiffForRunningClock: number;

  @IsNumber()
  maxPersonalFouls: number;

  @IsNumber()
  maxFOViolationPerHalf: number;
}
