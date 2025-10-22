import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create.plan.dto';
import { UpdatePlanDto } from './dto/update.plan.dto';
import { MongoIdType } from 'src/common/common.types';
import { MongoIdValidationPipe } from 'src/common/pipes/mongoid.validation.pipe';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post('create')
  async create(@Body() body: CreatePlanDto) {
    return await this.planService.create(body);
  }

  @Patch('update')
  async findByIdAndupdate(@Param('id', MongoIdValidationPipe) id: MongoIdType, @Body() body: UpdatePlanDto) {
    const player = await this.planService.findByIdAndupdate(id, body);
    return player;
  }

//   @Get()
//   findAll() {
//     return this.playerService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.playerService.findOne(id);
//   }
}
