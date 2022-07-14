import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionSchema } from './subscription.model';
import { SubscriptionService } from './subscription.service';
import { SubscriptionTypeService } from '../subscriptionType/subscriptionType.service';
import { SubscriptionTypeSchema } from '../subscriptionType/subscriptionType.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Subscription', schema: SubscriptionSchema },
      { name: 'subscription-type', schema: SubscriptionTypeSchema },
    ]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionTypeService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
