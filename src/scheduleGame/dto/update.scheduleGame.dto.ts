import { IsString, IsNumber, IsMongoId } from 'class-validator';

export class UpdateScheduleGameDto {
  @IsMongoId()
  opponentTeam: string;

  @IsNumber()
  scheduleDateTime: number;

  @IsString()
  home: string;

  @IsString()
  away: string;

  @IsString()
  conference: boolean;
}
