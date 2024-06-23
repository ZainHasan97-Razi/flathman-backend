import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ScheduleGameService } from './scheduleGame.service';
import { CreateScheduleGameDto } from './dto/create.scheduleGame.dto';
import { MongoIdType } from 'src/common/common.types';
import { ScheduleStatusEnumType } from './scheduleGame.schema';

@Controller('schedule-game')
export class ScheduleGameController {
  constructor(private readonly scheduleGameService: ScheduleGameService) {}

  @Post('create')
  create(@Body() body: CreateScheduleGameDto) {
    return this.scheduleGameService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: MongoIdType, @Body() body: CreateScheduleGameDto) {
    return this.scheduleGameService.update(id, body);
  }

  @Post('update-status/:id')
  updateStatus(
    @Param('id') id: MongoIdType,
    @Body('status') status: ScheduleStatusEnumType,
  ) {
    return this.scheduleGameService.updateStatus(id, status);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: MongoIdType) {
    return this.scheduleGameService.findByUserId(userId);
  }

  @Get('user/:userId/team/:teamId')
  findByUserAndTeamId(
    @Param('userId') userId: MongoIdType,
    @Param('teamId') teamId: MongoIdType,
  ) {
    return this.scheduleGameService.findByUserAndTeamId(userId, teamId);
  }
}
