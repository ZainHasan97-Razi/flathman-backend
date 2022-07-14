import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { SubscriptionTypeService } from './subscriptionType.service';

@Controller('subscription-type')
export class SubscriptionTypeController {
  constructor(
    private readonly subscriptionTypeService: SubscriptionTypeService,
  ) {}

  @Get()
  findAll() {
    return this.subscriptionTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionTypeService.findOne(id);
  }
}
