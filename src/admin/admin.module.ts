import { forwardRef, Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.services';
// import { HelperService } from 'src/constants/helper.service';
import { UserSchema } from 'src/user/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { TeamSchema } from 'src/team/teams.model';
import { TeamService } from 'src/team/teams.services';
import { AuthService } from 'src/auth/auth.service';
import { PlayerService } from 'src/player/player.service';
import { PlayerSchema } from 'src/player/player.model';
import { RuleSchema } from 'src/rules/rule.model';
import { RuleService } from 'src/rules/rule.service';
import { SubscriptionSchema } from 'src/subscription/userSubscription/subscription.model';
import { SubscriptionService } from 'src/subscription/userSubscription/subscription.service';
import { SubscriptionTypeSchema } from 'src/subscription/subscriptionType/subscriptionType.model';
import { SubscriptionTypeService } from 'src/subscription/subscriptionType/subscriptionType.service';
import { PlayerModule } from 'src/player/player.module';
import { EmailModule } from 'src/email/email.module';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [
    EmailModule,
    OtpModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Team', schema: TeamSchema },
      { name: 'Player', schema: PlayerSchema },
      { name: 'Rule', schema: RuleSchema },
      { name: 'Subscription', schema: SubscriptionSchema },
      { name: 'subscription-type', schema: SubscriptionTypeSchema },
    ]),
    forwardRef(() => PlayerModule),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    UserService,
    TeamService,
    AuthService,
    PlayerService,
    RuleService,
    SubscriptionService,
    SubscriptionTypeService,
  ],
})
export class AdminModule {}
