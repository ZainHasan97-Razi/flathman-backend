import { Module } from '@nestjs/common';
import { RuleController } from './rule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RuleSchema } from './rule.model';
import { RuleService } from './rule.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Rule', schema: RuleSchema }])],
  controllers: [RuleController],
  providers: [RuleService],
  exports: [RuleService],
})
export class RuleModule {}
