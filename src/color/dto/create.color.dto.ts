import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateColorDto {
  @IsString()
  @IsNotEmpty()
  colorName: any;

  @IsString()
  @IsNotEmpty()
  colorCode: any;
}
