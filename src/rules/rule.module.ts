import { Module } from '@nestjs/common';
import { RuleController } from './rule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RuleSchema } from './rule.model';
import { RuleService } from './rule.service';
import { StatsConfigService } from 'src/statsConfig/statsConfig.service';
import { StatsConfigSchema } from 'src/statsConfig/statsConfig.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Rule', schema: RuleSchema },
    { name: 'StatsConfig', schema: StatsConfigSchema },
  ])],
  controllers: [RuleController],
  providers: [RuleService, StatsConfigService],
  exports: [RuleService],
})
export class RuleModule {}
