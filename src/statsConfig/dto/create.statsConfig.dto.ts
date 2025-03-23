import { IsString, IsOptional, IsMongoId, ValidateIf } from 'class-validator';
import { MongoIdType } from 'src/common/common.types';

export class CreateStatsConfigDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

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
