import { Module } from '@nestjs/common';
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
import { EmailModule } from 'src/email/email.module';
// import { PlayerModule } from 'src/player/player.module';

@Module({
  imports: [
    EmailModule,
    MongooseModule.forFeature([
      { name: 'OpponentTeam', schema: OpponentTeamSchema },
      { name: 'Rule', schema: RuleSchema },
      { name: 'User', schema: UserSchema },
      { name: 'OpponentPlayer', schema: OpponentPlayerSchema },
    ]),
    // forwardRef(() => PlayerModule),
  ],
  controllers: [OpponentTeamController],
  providers: [
    OpponentTeamService,
    RuleService,
    UserService,
    OpponentPlayerService,
  ],
  exports: [OpponentTeamService],
})
export class OpponentTeamModulebb {}
