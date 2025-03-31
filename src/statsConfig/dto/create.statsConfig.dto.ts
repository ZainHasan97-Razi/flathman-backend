import { IsString, IsOptional, IsMongoId, ValidateIf } from 'class-validator';
import { MongoIdType } from 'src/common/common.types';
import { IsStringOrNumber } from 'src/decorators/is-string-or-number-validator.decorator';

export class CreateStatsConfigDto {
  @IsString()
  displayName: string;

  @IsString()
  slug: string;

  @IsStringOrNumber()
  value: string | number;

  @IsString()
  description: string;

  @IsOptional()
  @ValidateIf((o) => o.parentId !== null && o.parentSlug !== null)
  @IsMongoId()
  // make a custom decoratr to validate this parentId and parentSlug
  parentId: MongoIdType | null;

  @IsOptional()
  @ValidateIf((o) => o.parentId !== null && o.parentSlug !== null)
  @IsString()
  parentSlug: string | null;
}
