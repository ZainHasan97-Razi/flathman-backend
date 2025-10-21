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
// import { PlayerService } from './player.service';
// import { CreatePlayerDto } from './dto/create.player.dto';
// import { UpdatePlayerDto } from './dto/update.player.dto';

@Controller('plan')
export class PlanController {
//   constructor(private readonly playerService: PlayerService) {}

//   @Post('create')
//   async create(@Body() body: CreatePlayerDto) {
//     const response = await this.playerService.createPlayer(body);
//     return response;
//   }

//   @Patch('update')
//   async update(@Body() body: UpdatePlayerDto) {
//     const player = await this.playerService.updatePlayer(body);
//     return player;
//   }

//   @Get()
//   findAll() {
//     return this.playerService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.playerService.findOne(id);
//   }
}
