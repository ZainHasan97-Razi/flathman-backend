import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionBundleSchema } from './subscriptionBundle.model';
import { SubscriptionBundleController } from './subscriptionBundle.controller';
import { SubscriptionBundleService } from './subscriptionBundle.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'subscription-bundle', schema: SubscriptionBundleSchema },
    ]),
  ],
  controllers: [SubscriptionBundleController],
  providers: [SubscriptionBundleService /*SubscriptionTypeService*/],
  exports: [SubscriptionBundleService],
})
export class SubscriptionBundleModule {}
