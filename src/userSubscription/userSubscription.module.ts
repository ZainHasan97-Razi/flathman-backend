import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSubscriptionSchema } from './userSubscription.model';
import { SubscriptionBundleSchema } from 'src/subscriptionBundle/subscriptionBundle.model';
import { UserSubscriptionController } from './userSubscription.controller';
import { UserSubscriptionService } from './userSubscription.service';
import { SubscriptionBundleService } from 'src/subscriptionBundle/subscriptionBundle.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user-subscription', schema: UserSubscriptionSchema },
      { name: 'subscription-bundle', schema: SubscriptionBundleSchema },
    ]),
  ],
  controllers: [UserSubscriptionController],
  providers: [UserSubscriptionService, SubscriptionBundleService],
  exports: [UserSubscriptionService],
})
export class UserSubscriptionModule {}
