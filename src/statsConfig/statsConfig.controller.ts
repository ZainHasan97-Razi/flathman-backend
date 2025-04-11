import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { StatsConfigService } from './statsConfig.service'; 

@Controller('stats-config')
export class StatsConfigController {
  constructor(private readonly statsConfigService: StatsConfigService) {}

//   @Get()
//   findAll() {
//     return this.ruleService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.ruleService.findOne(id);
//   }
}
