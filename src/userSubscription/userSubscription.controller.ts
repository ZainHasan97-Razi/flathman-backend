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
import mongoose from 'mongoose';
import { UserSubscriptionService } from './userSubscription.service';

@Controller('user-subscription')
export class UserSubscriptionController {
  constructor(
    private readonly userSubscriptionService: UserSubscriptionService,
  ) {}
}
