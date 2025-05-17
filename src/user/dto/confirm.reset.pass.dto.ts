import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  ArrayMaxSize,
  ArrayMinSize,
  IsMongoId,
  IsEmail,
  IsNumberString,
} from 'class-validator';

export class ConfirmResetPasswordDto {
  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail({ message: 'Invalid email!' })
  email: string;

  @IsNotEmpty({ message: 'Otp is required!' })
  @IsNumberString({ message: 'Otp must be numeric!' })
  code: string;

  @IsNotEmpty({ message: 'Password is required!' })
  @IsString({ message: 'Invalid password!' })
  password: string;
}
