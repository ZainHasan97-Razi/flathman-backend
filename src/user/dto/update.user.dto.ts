import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  ArrayMaxSize,
  ArrayMinSize,
  IsMongoId,
} from 'class-validator';

export class UpdateUserDto {
  @IsMongoId()
  userId: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsBoolean()
  isAdmin: boolean;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  contactNumber: number;

  @IsString()
  @IsNotEmpty()
  password: string;

  // @IsArray() // hoga ye array ma hi store mgr value string ma lenga
  @ArrayMaxSize(3)
  @ArrayMinSize(1)
  deviceTokens: Array<string>;
}
