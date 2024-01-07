import { IsEnum, IsOptional } from 'class-validator';
import { CreateBundleDto } from './create.bundle.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { BundleStatusEnum } from 'src/constants/enums';

// export class UpdateBundleDto extends PartialType(
//   OmitType(CreateBundleDto, [
//     // 'name',
//     // 'createdBy',
//     // 'deletedAt',
//     // 'status', // changeable but not from update request there will be seprate function for update status
//     // 'maxCampaignBudget',
//     // 'maximumRedemptions',
//     // 'redemptionsCount',
//     'type',
//   ]),
// ) {}

export class UpdateBundleDto extends PartialType(
  OmitType(CreateBundleDto, ['type']),
) {
  @IsOptional()
  @IsEnum(BundleStatusEnum)
  status: keyof typeof BundleStatusEnum;
}
