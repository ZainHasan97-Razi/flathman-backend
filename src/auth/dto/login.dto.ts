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
  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail({ message: 'Invalid email!' })
  email: string;

  @IsNotEmpty({ message: 'Password is required!' })
  @IsString({ message: 'Invalid password!' })
  password: string;

  // @ArrayMaxSize(3)
  // @IsNotEmpty()
  // deviceTokens: string;
}
