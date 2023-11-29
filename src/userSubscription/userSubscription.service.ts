import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
@Injectable()
export class UserSubscriptionService {
  constructor() // private subscriptionModel: Model<SubscriptionModelDto>, // @InjectModel('Subscription') // private subscriptionTypeModel: Model<CreateSubscriptionTypeDto>, // @InjectModel('subscription-bundle')
  // private subscriptionTypeModel: Model<CreateSubscriptionTypeDto>,
  // private readonly subscriptionTypeService: SubscriptionTypeService,
  {}
}
