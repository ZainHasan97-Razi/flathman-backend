// import { BaseProjectDto } from './base-project.dto';
import { MaxLength, IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateOpponentPlayerDto {
  @IsMongoId({ message: 'Invalid team!' })
  @IsNotEmpty({ message: 'Invalid team!' })
  teamId;

  @IsString({ message: 'Player name is required!' })
  @IsNotEmpty({ message: 'Player name is required!' })
  playerName: string;

  // @IsOptional()
  // @IsBoolean()
  isCaptain?: boolean;

  // @IsOptional()
  // @IsString({ message: 'Position is required!' })
  // @IsNotEmpty({ message: 'Position is required!' })
  position?: string;

  @IsString({ message: 'Player number is required!' })
  @IsNotEmpty({ message: 'Player number is required!' })
  playerNumber: string;
}
