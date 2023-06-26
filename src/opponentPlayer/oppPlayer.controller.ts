import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UsePipes,
} from '@nestjs/common';
import { OpponentPlayerService } from './oppPlayer.service';
import { CreateOpponentPlayerDto } from './dto/create.oppPlayer.dto';
import { UpdateOpponentPlayerDto } from './dto/update.oppPlayer.dto';
import { MongoIdValidationPipe } from 'src/common/pipes/mongoid.validation.pipe';
// import { UpdatePlayerDto } from './dto/update.player.dto';

@Controller('opponentPlayer')
export class OpponentPlayerController {
  constructor(private readonly oppPlayerService: OpponentPlayerService) {}

  @Post('create')
  async create(@Body() body: CreateOpponentPlayerDto) {
    const response = await this.oppPlayerService.createPlayer(body);
    return response;
  }

  @Patch('update')
  async update(@Body() body: UpdateOpponentPlayerDto) {
    const player = await this.oppPlayerService.updatePlayer(body);
    return player;
  }

  @Get()
  findAll() {
    return this.oppPlayerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oppPlayerService.findOne(id);
  }

  @Get('my/:id')
  findTeamPlayers(@Param('id') id: string) {
    return this.oppPlayerService.findTeamPlayers(id);
  }

  @Delete(':id')
  @UsePipes(new MongoIdValidationPipe())
  delete(@Param('id') id: string) {
    return this.oppPlayerService.delete(id);
  }
}
