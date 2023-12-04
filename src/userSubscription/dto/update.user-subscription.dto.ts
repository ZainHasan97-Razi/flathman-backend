import { IsNumber, IsEnum, IsOptional } from 'class-validator';
import { SubscriptionStatusEnum } from 'src/constants/enums';

export class UpdateUserSubscriptionDto {
  @IsOptional()
  @IsEnum(SubscriptionStatusEnum)
  status: keyof typeof SubscriptionStatusEnum;

  @IsOptional()
  @IsNumber()
  timesUsed: number;
}
