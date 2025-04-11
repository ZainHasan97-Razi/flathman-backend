import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TeamService } from './teams.services';
import { CreateTeamDto } from './dto/create.team.dto';
import { MongoIdValidationPipe } from 'src/common/pipes/mongoid.validation.pipe';
import mongoose from 'mongoose';
import { SettingNameEnumType } from './teams.model';
import { MongoIdType } from 'src/common/common.types';

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
  findUserTeams(@Param('id', MongoIdValidationPipe) id: mongoose.Types.ObjectId) {
    return this.teamService.findMyTeam(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.teamService.delete(id);
  }

  @Patch("reset/setting/:settingName/:teamId")
  resetTeamSetting(@Param('settingName') settingName: SettingNameEnumType, @Param('teamId') teamId: MongoIdType, @Query("penaltyOptionName") penaltyOptionName: "technical"|"personal") {
    return this.teamService.resetTeamSetting(settingName, teamId, penaltyOptionName)
  }
}
