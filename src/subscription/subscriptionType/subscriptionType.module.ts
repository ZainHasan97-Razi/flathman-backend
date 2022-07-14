import { Module } from '@nestjs/common';
import { SubscriptionTypeController } from './subscriptionType.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionTypeSchema } from './subscriptionType.model';
import { SubscriptionTypeService } from './subscriptionType.service';
import { SubscriptionSchema } from '../userSubscription/subscription.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'subscription-type', schema: SubscriptionTypeSchema },
      { name: 'Subscription', schema: SubscriptionSchema },
    ]),
  ],
  controllers: [SubscriptionTypeController],
  providers: [SubscriptionTypeService],
  exports: [SubscriptionTypeService],
})
export class SubscriptionTypeModule {}
