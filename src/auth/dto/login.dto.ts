// import { BaseProjectDto } from './base-project.dto';
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  // @ArrayMaxSize(3)
  @IsNotEmpty()
  deviceTokens: string;
}
