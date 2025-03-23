import { IsString, IsOptional, IsMongoId } from 'class-validator';
import { MongoIdType } from 'src/common/common.types';

export class UpdateStatsConfigDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsMongoId()
  parentId: MongoIdType | null;

  @IsOptional()
  @IsString()
  parentSlug: string | null;
}