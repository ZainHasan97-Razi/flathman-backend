import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { OpponentTeamService } from './oppTeam.services';
import { CreateOpponentTeamDto } from './dto/create.oppTeam.dto';
import { UpdateOppTeamDto } from './dto/update.oppTeam.dto';
import { IsMongoId } from 'class-validator';
import { MongoIdValidationPipe } from 'src/common/pipes/mongoid.validation.pipe';

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
  @UsePipes(new MongoIdValidationPipe())
  findOne(@Param('id') id: string) {
    return this.oppteamService.findOne(id);
  }

  @Get('by-licensed-team/:id')
  @UsePipes(new MongoIdValidationPipe())
  findOppteamsOfLicensedTeam(@Param('id') id: string) {
    // Now the id parameter is validated as a MongoDB ObjectId
    return this.oppteamService.findOppteamsOfLicensedTeam(id);
  }

  @Get('my/:id')
  @UsePipes(new MongoIdValidationPipe())
  findUserTeams(@Param('id') id: string) {
    return this.oppteamService.findMyTeam(id);
  }

  @Delete(':id')
  @UsePipes(new MongoIdValidationPipe())
  delete(@Param('id') id: string) {
    return this.oppteamService.delete(id);
  }
}
