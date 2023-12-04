import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Req,
  Query,
  Patch,
} from '@nestjs/common';
import { BundleService } from './bundle.service';
import mongoose from 'mongoose';
import { CreateBundleDto } from './dto/create.bundle.dto';
import { UpdateBundleDto } from './dto/update.bundle.dto';
import { MongoIdValidationPipe } from 'src/common/pipes/mongoid.validation.pipe';
import { MongoIdType } from 'src/common/types/mongoid.type';

@Controller('bundle')
export class SubscriptionBundleController {
  constructor(private readonly bundleService: BundleService) {}

  @Post('create')
  create(@Body() body: CreateBundleDto) {
    return this.bundleService.create(body);
  }

  @Patch('update/:id')
  update(
    @Param('id', MongoIdValidationPipe) id: MongoIdType,
    @Body() body: UpdateBundleDto,
  ) {
    return this.bundleService.update(id, body);
  }

  @Get('/:userId')
  findByUserId(@Param('userId', MongoIdValidationPipe) userId: MongoIdType) {
    return this.bundleService.findByUserId(userId);
  }

  @Get()
  findAll() {
    return this.bundleService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bundleService.findOne(id);
  // }
}
