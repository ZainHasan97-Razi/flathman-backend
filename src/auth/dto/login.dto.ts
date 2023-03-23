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
  @IsEmail({ message: 'Invalid email!' })
  email: string;

  @IsNotEmpty({ message: 'Password is required!' })
  password: string;

  // @ArrayMaxSize(3)
  // @IsNotEmpty()
  // deviceTokens: string;
}
