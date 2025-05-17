import { Module, forwardRef } from '@nestjs/common';
import { OpponentTeamController } from './oppTeam.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OpponentTeamSchema } from './oppTeam.model';
import { OpponentTeamService } from './oppTeam.services';
import { RuleSchema } from 'src/rules/rule.model';
import { RuleService } from 'src/rules/rule.service';
import { UserSchema } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { OpponentPlayerSchema } from 'src/opponentPlayer/oppPlayer.model';
import { OpponentPlayerService } from 'src/opponentPlayer/oppPlayer.service';
import { TeamSchema } from 'src/team/teams.model';
import { TeamService } from 'src/team/teams.services';
import { PlayerSchema } from 'src/player/player.model';
import { PlayerService } from 'src/player/player.service';
import { EmailModule } from 'src/email/email.module';
import { OtpModule } from 'src/otp/otp.module';
import { StatsConfigSchema } from 'src/statsConfig/statsConfig.model';
import { StatsConfigService } from 'src/statsConfig/statsConfig.service';
// import { PlayerModule } from 'src/player/player.module';

@Module({
  imports: [
    EmailModule,
    OtpModule,
    MongooseModule.forFeature([
      { name: 'OpponentTeam', schema: OpponentTeamSchema },
      { name: 'OpponentPlayer', schema: OpponentPlayerSchema },
      { name: 'Rule', schema: RuleSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Team', schema: TeamSchema },
      { name: 'Player', schema: PlayerSchema },
      { name: 'StatsConfig', schema: StatsConfigSchema },
    ]),
    // forwardRef(() => TeamModulebb),
  ],
  controllers: [OpponentTeamController],
  providers: [
    OpponentTeamService,
    RuleService,
    UserService,
    OpponentPlayerService,
    TeamService,
    PlayerService,
    StatsConfigService,
  ],
  exports: [OpponentTeamService],
})
export class OpponentTeamModulebb {}
