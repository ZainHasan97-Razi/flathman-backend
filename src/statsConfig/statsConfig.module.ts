import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsConfigSchema } from './statsConfig.model';
import { StatsConfigController } from './statsConfig.controller';
import { StatsConfigService } from './statsConfig.service';
import { RuleService } from 'src/rules/rule.service';
import { RuleSchema } from 'src/rules/rule.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'StatsConfig', schema: StatsConfigSchema },
      { name: 'Rule', schema: RuleSchema },
    ]),
  ],
  controllers: [StatsConfigController],
  providers: [StatsConfigService, RuleService],
  exports: [StatsConfigService],
})
export class StatsConfigModule {}
