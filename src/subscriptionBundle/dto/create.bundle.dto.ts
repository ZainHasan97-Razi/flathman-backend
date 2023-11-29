// import { BaseProjectDto } from './base-project.dto';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsEnum,
  Min,
  IsOptional,
} from 'class-validator';
import { BundleStatusEnum, SubscriptionTypeEnum } from 'src/constants/enums';

export class CreateBundleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsArray()
  features: Array<object>;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  priceUnit: string;

  // @IsOptional()
  // @IsNotEmpty()
  // @IsEnum(BundleStatusEnum)
  // status: keyof typeof BundleStatusEnum;

  @IsNotEmpty()
  @IsString()
  androidProductId: string;

  @IsNotEmpty()
  @IsString()
  iosProductId: string;

  @IsEnum(SubscriptionTypeEnum)
  type: keyof typeof SubscriptionTypeEnum;

  @IsNotEmpty()
  @IsNumber()
  displayOrder: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  numberOfUsage: number;
}
