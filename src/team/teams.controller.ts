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
import { UpdateTeamDto } from './dto/update.team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('create')
  async create(@Body() body: CreateTeamDto) {
    // console.log('create team bodyt ==>>', body);
    const response = await this.teamService.createTeam(body);
    return response;
  }

  @Patch('update')
  async update(@Body() body: UpdateTeamDto) {
    const team = await this.teamService.updateTeam(body);
    return team;
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
  findUserTeams(@Param('id') id: string) {
    return this.teamService.findMyTeam(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.teamService.delete(id);
  }
}
