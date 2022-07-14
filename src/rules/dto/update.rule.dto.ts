import { IsString, IsNumber, IsMongoId } from 'class-validator';

export class UpdateRuleDto {
  @IsMongoId()
  id;

  @IsString()
  ruleName: string;

  @IsString()
  ruleId: string;

  @IsString()
  gender: string;

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

  // Number of timeouts a team gets per half
  @IsNumber()
  timeoutsPerHalf: number;

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
  @IsNumber()
  goalDiffForRunningClock: number;

  @IsNumber()
  maxPersonalFouls: number;

  @IsNumber()
  maxFOViolationPerHalf: number;
}
