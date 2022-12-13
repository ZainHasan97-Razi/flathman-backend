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

@Controller('opponentTeam')
export class OpponentTeamController {
  constructor(private readonly oppteamService: OpponentTeamService) {}

  @Post('create')
  async create(@Body() body: CreateOpponentTeamDto) {
    console.log('create team body oppTeam ==>>', body);
    const response = await this.oppteamService.createTeam(body);
    return response;
  }

  // @Patch('update')
  // async update(@Body() body: UpdateTeamDto) {
  //   const team = await this.teamService.updateTeam(body);
  //   return team;
  // }

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
