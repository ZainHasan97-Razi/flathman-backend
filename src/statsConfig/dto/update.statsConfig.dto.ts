import { IsString, IsOptional, IsMongoId } from 'class-validator';
import { MongoIdType } from 'src/common/common.types';
import { IsStringOrNumber } from 'src/decorators/is-string-or-number-validator.decorator';

export class UpdateStatsConfigDto {
  @IsString()
  displayName: string;

  @IsStringOrNumber()
  value: string | number;

  @IsString()
  description: string;

  @IsOptional()
  @IsMongoId()
  parentId: MongoIdType | null;

  @IsOptional()
  @IsString()
  parentSlug: string | null;
}