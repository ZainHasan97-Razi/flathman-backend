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
import { OpponentTeamService } from './oppTeam.services';
import { CreateOpponentTeamDto } from './dto/create.oppTeam.dto';
import { UpdateOppTeamDto } from './dto/update.oppTeam.dto';

@Controller('opponentTeam')
export class OpponentTeamController {
  constructor(private readonly oppteamService: OpponentTeamService) {}

  @Post('create')
  async create(@Body() body: CreateOpponentTeamDto) {
    const response = await this.oppteamService.createTeam(body);
    return response;
  }

  @Patch('update')
  async update(@Body() body: UpdateOppTeamDto) {
    const team = await this.oppteamService.updateTeam(body);
    return team;
  }

  @Get()
  findAll() {
    return this.oppteamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oppteamService.findOne(id);
  }

  @Get('my/:id')
  findUserTeams(@Param('id') id: string) {
    return this.oppteamService.findMyTeam(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.oppteamService.delete(id);
  }
}
