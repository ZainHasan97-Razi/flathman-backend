import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TeamService } from './teams.services';
import { CreateTeamDto } from './dto/create.team.dto';
import { MongoIdValidationPipe } from 'src/common/pipes/mongoid.validation.pipe';
import mongoose from 'mongoose';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('create')
  create(@Body() body: CreateTeamDto) {
    return this.teamService.createTeam(body);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Get('my/:id')
  findUserTeams(
    @Param('id', MongoIdValidationPipe) id: mongoose.Types.ObjectId,
  ) {
    return this.teamService.findMyTeam(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.teamService.delete(id);
  }

  // New endpoint to fetch default turnover options
  @Get('defaults/turnover-options')
  getDefaultTurnoverOptions() {
    return this.teamService.getDefaultTurnoverOptions();
  }
}
