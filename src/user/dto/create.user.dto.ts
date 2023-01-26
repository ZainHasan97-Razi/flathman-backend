import {
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  // @MaxLength(6)
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsBoolean()
  isAdmin: boolean;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  contactNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // @IsArray() // hoga ye array ma hi store mgr value string ma lenga
  // @IsNotEmpty()
  // @ArrayMaxSize(3)
  // @ArrayMinSize(1)
  // deviceTokens: Array<string>;
}
