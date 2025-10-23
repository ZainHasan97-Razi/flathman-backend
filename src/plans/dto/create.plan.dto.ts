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
import { IsStringArray } from 'src/common/validator/validate.common';

export class CreatePlanDto {
  @IsString({ message: 'Display name is required!' })
  displayName: string;

  @IsString({ message: 'Description is required!' })
  description: string;

  @IsEnum(PlanTypeEnum)
  type: PlanTypeEnumType;

  @IsNumber()
  costUsd: number;

  @ValidateIf((d) => d.type === PlanTypeEnum.monthly)
  @IsStringArray()
  months: string[];
}
