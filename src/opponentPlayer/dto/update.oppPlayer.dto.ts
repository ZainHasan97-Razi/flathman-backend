// import { BaseProjectDto } from './base-project.dto';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class UpdateOpponentPlayerDto {
  @IsMongoId({ message: 'Invalid player!' })
  @IsNotEmpty({ message: 'Invalid player!' })
  playerId: string;

  @IsString({ message: 'Player name is required!' })
  @IsNotEmpty({ message: 'Player name is required!' })
  playerName: string;

  @IsString({ message: 'Player number is required!' })
  @IsNotEmpty({ message: 'Player number is required!' })
  playerNumber: string;
}
