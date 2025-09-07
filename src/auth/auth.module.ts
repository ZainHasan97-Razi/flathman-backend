import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.model';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { EmailModule } from 'src/email/email.module';
import { OtpModule } from 'src/otp/otp.module';
import { SubscriptionService } from 'src/subscription/userSubscription/subscription.service';
import { SubscriptionTypeService } from 'src/subscription/subscriptionType/subscriptionType.service';
import { SubscriptionSchema } from 'src/subscription/userSubscription/subscription.model';
import { SubscriptionTypeSchema } from 'src/subscription/subscriptionType/subscriptionType.model';
import { ShareAccountSchema } from 'src/shareAccount/share-account.model';

@Module({
  imports: [
    EmailModule,
    OtpModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Subscription', schema: SubscriptionSchema },
      { name: 'subscription-type', schema: SubscriptionTypeSchema },
      { name: 'ShareAccount', schema: ShareAccountSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, SubscriptionService, SubscriptionTypeService],
})
export class AuthModule {}
