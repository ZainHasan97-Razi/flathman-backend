import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleGameSchema } from './scheduleGame.schema';
import { ScheduleGameController } from './scheduleGame.controller';
import { ScheduleGameService } from './scheduleGame.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ScheduleGame', schema: ScheduleGameSchema },
    ]),
  ],
  controllers: [ScheduleGameController],
  providers: [ScheduleGameService],
  exports: [ScheduleGameService],
})
export class ScheduleGameModule {}
