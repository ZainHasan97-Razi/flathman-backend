import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSubscriptionSchema } from './userSubscription.model';
import { BundleSchema } from 'src/bundle/bundle.model';
import { UserSubscriptionController } from './userSubscription.controller';
import { UserSubscriptionService } from './userSubscription.service';
import { BundleService } from 'src/bundle/bundle.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user-subscription', schema: UserSubscriptionSchema },
      { name: 'Bundle', schema: BundleSchema },
    ]),
  ],
  controllers: [UserSubscriptionController],
  providers: [UserSubscriptionService, BundleService],
  exports: [UserSubscriptionService],
})
export class UserSubscriptionModule {}
