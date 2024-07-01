import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ScheduleGameService } from './scheduleGame.service';
import { CreateScheduleGameDto } from './dto/create.scheduleGame.dto';
import { MongoIdType } from 'src/common/common.types';
import { ScheduleStatusEnumType } from './scheduleGame.schema';
import { UpdateScheduleGameDto } from './dto/update.scheduleGame.dto';

@Controller('schedule-game')
export class ScheduleGameController {
  constructor(private readonly scheduleGameService: ScheduleGameService) {}

  @Post('create')
  create(@Body() body: CreateScheduleGameDto) {
    return this.scheduleGameService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: MongoIdType, @Body() body: UpdateScheduleGameDto) {
    return this.scheduleGameService.update(id, body);
  }

  @Patch('update-status/:id')
  updateStatus(
    @Param('id') id: MongoIdType,
    @Body('status') status: ScheduleStatusEnumType,
  ) {
    return this.scheduleGameService.updateStatus(id, status);
  }

  @Get(':id')
  findById(@Param('id') id: MongoIdType) {
    return this.scheduleGameService.findById(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: MongoIdType) {
    return this.scheduleGameService.findByUserId(userId);
  }

  @Get('team/:teamId')
  findByUserAndTeamId(
    @Param('teamId') teamId: MongoIdType,
  ) {
    return this.scheduleGameService.findByTeamId(teamId);
  }
}
