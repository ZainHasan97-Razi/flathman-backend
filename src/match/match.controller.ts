import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create.match.dto';
import { UpdateMatchDto } from './dto/update.match.dto';
import { SuspendMatchDto } from './dto/suspend.match.dto';
import { CompleteSuspendedMatchDto } from './dto/completeSuspendedMatch.match.dto';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('create')
  create(@Body() body: CreateMatchDto) {
    return this.matchService.create(body);
  }

  @Post('update')
  update(@Body() body: UpdateMatchDto) {
    return this.matchService.update(body);
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
  // @Get(':id')
  // findOneSuspended(@Param('id') id: string) {
  //   return this.matchService.findOneSuspended(id);
  // }
}
