import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create.match.dto';
import { UpdateMatchDto } from './dto/update.match.dto';
import { SuspendMatchDto } from './dto/suspend.match.dto';
import { CompleteSuspendedMatchDto } from './dto/completeSuspendedMatch.match.dto';
import { MongoIdType } from 'src/common/common.types';
import { MongoIdValidationPipe } from 'src/common/pipes/mongoid.validation.pipe';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('create')
  create(@Body() body: CreateMatchDto) {
    return this.matchService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: MongoIdType, @Body() body: UpdateMatchDto) {
    return this.matchService.update(id, body);
  }

  @Post('suspend')
  suspend(@Body() body: SuspendMatchDto) {
    return this.matchService.suspend(body);
  }

  @Patch('complete-suspended-match')
  endSuspendedGame(@Body() body: CompleteSuspendedMatchDto) {
    return this.matchService.endSuspendedGame(body);
  }

  @Get()
  findAll() {
    return this.matchService.findAll();
  }
  @Get('suspended/:id')
  findAllUserSuspendedLogs(@Param('id') id: string) {
    return this.matchService.findUserSuspendedLogs(id);
  }

  @Get('my/:id')
  findAllUserLogs(@Param('id') id: string) {
    return this.matchService.findUserLogs(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchService.findOne(id);
  }

  @Get('licensed-team/:id')
  findByLicensedTeamId(@Param('id') id: MongoIdType) {
    return this.matchService.gameResultsAndScheduleListByLicensedTeam(id);
  }
  // @Get(':id')
  // findOneSuspended(@Param('id') id: string) {
  //   return this.matchService.findOneSuspended(id);
  // }
  @Delete(':id')
  findOneAndDelete(@Param('id') id: string) {
    return this.matchService.delete(id);
  }

  @Get('scheduled-games/:id')
  findScheduledGamesByLicensedTeam(@Param('id') id: MongoIdType) {
    return this.matchService.gameResultsAndScheduleListByLicensedTeam(id, true);
  }

  @Get('game-result-count/:id')
  gameResultCountsByLicensedTeamId(@Param('id') id: MongoIdType) {
    return this.matchService.gameResultCounts(id);
  }
  
  // @Get("game-result-and-schedule-list/:teamId")
  // gameResultsAndScheduleList(@Param('teamId') teamId: MongoIdType) {
  //   return this.matchService.gameResultsAndScheduleListByLicensedTeam(teamId)
  // }
  @Get(":matchId/players/update-check")
  playersUpdateCheck(@Param('matchId', MongoIdValidationPipe) matchId: MongoIdType) {
    return this.matchService.playersUpdateCheck(matchId);
  }

}
