// import { BaseProjectDto } from './base-project.dto';
import { MaxLength, IsNotEmpty, IsEmail, ArrayMaxSize } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail({ message: 'Invalid email!' })
  email: string;

  @IsNotEmpty({ message: 'Password is required!' })
  password: string;

  // @ArrayMaxSize(3)
  // @IsNotEmpty()
  // deviceTokens: string;
}
