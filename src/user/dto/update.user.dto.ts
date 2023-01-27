import {
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  ArrayMaxSize,
  ArrayMinSize,
  IsMongoId,
  IsEmail,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'User is required!' })
  @IsMongoId({ message: 'Invalid user!' })
  userId: string;

  @IsString({ message: 'Invalid username!' })
  @IsNotEmpty({ message: 'Username is required!' })
  userName: string;

  @IsBoolean()
  isAdmin: boolean;

  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail({ message: 'Invalid email!' })
  email: string;

  @IsNotEmpty({ message: 'Contact number is required!' })
  @IsString({ message: 'Invalid contact number!' })
  @MaxLength(10, { message: 'Contact number should be of 10 digits' })
  @MinLength(10, { message: 'Contact number should be of 10 digits' })
  contactNumber: string;

  @IsNotEmpty({ message: 'Password is required!' })
  @IsString({ message: 'Invalid password!' })
  password: string;

  // @IsArray() // hoga ye array ma hi store mgr value string ma lenga
  // @ArrayMaxSize(3)
  // @ArrayMinSize(1)
  // deviceTokens: Array<string>;
}
