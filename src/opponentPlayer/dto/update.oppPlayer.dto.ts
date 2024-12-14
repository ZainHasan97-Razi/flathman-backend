// import { BaseProjectDto } from './base-project.dto';
import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';

export class UpdateOpponentPlayerDto {
  @IsMongoId({ message: 'Invalid player!' })
  @IsNotEmpty({ message: 'Invalid player!' })
  playerId: string;

  @IsString({ message: 'Player name is required!' })
  @IsNotEmpty({ message: 'Player name is required!' })
  playerName: string;

  @IsOptional()
  @IsString({ message: 'First name is required!' })
  @IsNotEmpty({ message: 'First name is required!' })
  firstName: string;

  @IsOptional()
  @IsString({ message: 'Last name is required!' })
  @IsNotEmpty({ message: 'Last name is required!' })
  lastName: string;

  @IsString({ message: 'Player number is required!' })
  @IsNotEmpty({ message: 'Player number is required!' })
  playerNumber: string;
}
