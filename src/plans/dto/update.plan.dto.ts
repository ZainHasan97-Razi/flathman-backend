import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { PlanStatusEnum, PlanStatusEnumType, PlanTypeEnum, PlanTypeEnumType } from '../plan.model';

export class UpdatePlanDto {
  @IsOptional()
  @IsString({ message: 'Display name is required!' })
  displayName: string;

  @IsOptional()
  @IsString({ message: 'Description is required!' })
  description: string;

  @IsOptional()
  @IsEnum(PlanTypeEnum)
  type: PlanTypeEnumType;

  @IsOptional()
  @IsEnum(PlanStatusEnum)
  status: PlanStatusEnumType;

  @IsOptional()
  @IsNumber()
  costUsd: number;

  @IsOptional()
  @ValidateIf((d) => d.type === PlanTypeEnum.monthly)
  @IsArray({ message: 'Months should be an array of numbers!' })
  @ValidateNested({ each: true })
  @IsNumber({}, { each: true })
  months: number[];
}
