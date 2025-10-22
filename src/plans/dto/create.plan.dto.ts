import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { PlanTypeEnum, PlanTypeEnumType } from '../plan.model';

export class CreatePlanDto {
  @IsString({ message: 'Display name is required!' })
  displayName: string;

  @IsString({ message: 'Description is required!' })
  description: string;

  @IsEnum(PlanTypeEnum)
  type: PlanTypeEnumType;

  @IsNumber()
  costUsd: number;

  @IsOptional()
  @ValidateIf((d) => d.type === PlanTypeEnum.monthly)
  @IsArray({ message: 'Months should be an array of numbers!' })
  @ValidateNested({ each: true })
  @IsNumber({}, { each: true })
  months: number[];
}
