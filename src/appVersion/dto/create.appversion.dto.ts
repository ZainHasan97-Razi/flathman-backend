// import { BaseProjectDto } from './base-project.dto';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { PlatformEnum } from 'src/constants/enums';

export class CreateAppVersionDto {
  // @IsString({ message: 'Team name is required!' })
  @IsEnum(PlatformEnum)
  platform: string;

  @IsNotEmpty({ message: 'Version is required!' })
  @IsString({ message: 'Version is string!' })
  version: string;

  @IsEnum({ force: 'force', non_force: 'non_force' })
  updateType: string;

  deletedAt: Date | null;
}
