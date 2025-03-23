// import { BaseProjectDto } from './base-project.dto';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';

export class CreateAppVersionDto {
  // @IsString({ message: 'Team name is required!' })
  @IsEnum({ android: 'android', ios: 'ios' })
  platform: string;

  @IsNotEmpty({ message: 'Version is required!' })
  @IsString({ message: 'Version is string!' })
  version: string;

  @IsEnum({ force: 'force', non_force: 'non_force' })
  updateType: string;

  deletedAt: Date | null;
}
