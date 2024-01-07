import { Controller, Body, Post, Get, Param, Patch } from '@nestjs/common';
import mongoose from 'mongoose';
import { UserSubscriptionService } from './userSubscription.service';
import { CreateUserSubscriptionDto } from './dto/create.user-subscription.dto';
import { MongoIdValidationPipe } from 'src/common/pipes/mongoid.validation.pipe';
import { MongoIdType } from 'src/common/types/mongoid.type';
import { UpdateUserSubscriptionDto } from './dto/update.user-subscription.dto';

@Controller('user-subscription')
export class UserSubscriptionController {
  constructor(private readonly subscriptionService: UserSubscriptionService) {}

  @Post('create')
  create(@Body() body: CreateUserSubscriptionDto) {
    return this.subscriptionService.create(body);
  }

  @Patch('update/:id')
  update(
    @Param('id', MongoIdValidationPipe) id: MongoIdType,
    @Body() body: UpdateUserSubscriptionDto,
  ) {
    return this.subscriptionService.update(id, body);
  }

  @Get('remaining/:userId')
  findUserAvailableSubscriptionCount(
    @Param('userId', MongoIdValidationPipe) userId: MongoIdType,
  ) {
    return this.subscriptionService.findUserAvailableSubscriptionCount(userId);
  }

  // @Get()
  // findAll() {
  //   return this.subscriptionService.findAll();
  // }
}
