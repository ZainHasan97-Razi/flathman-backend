import { Module, forwardRef } from '@nestjs/common';
import { TeamController } from './teams.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamSchema } from './teams.model';
import { TeamService } from './teams.services';
import { RuleSchema } from 'src/rules/rule.model';
import { RuleService } from 'src/rules/rule.service';
import { UserSchema } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { PlayerSchema } from 'src/player/player.model';
import { PlayerService } from 'src/player/player.service';
import { EmailModule } from 'src/email/email.module';
import { OtpModule } from 'src/otp/otp.module';
// import { PlayerModule } from 'src/player/player.module';

@Module({
  imports: [
    EmailModule,
    OtpModule,
    MongooseModule.forFeature([
      { name: 'Team', schema: TeamSchema },
      { name: 'Rule', schema: RuleSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Player', schema: PlayerSchema },
    ]),
    // forwardRef(() => PlayerModule),
  ],
  controllers: [TeamController],
  providers: [TeamService, RuleService, UserService, PlayerService],
  exports: [TeamService],
})
export class TeamModulebb {}
