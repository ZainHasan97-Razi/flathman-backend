import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsConfigSchema } from './statsConfig.model';
import { StatsConfigController } from './statsConfig.controller';
import { StatsConfigService } from './statsConfig.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'StatsConfig', schema: StatsConfigSchema }]),
  ],
  controllers: [StatsConfigController],
  providers: [StatsConfigService],
  exports: [StatsConfigService],
})
export class StatsConfigModule {}
