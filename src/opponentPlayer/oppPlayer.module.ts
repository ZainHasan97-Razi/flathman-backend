import { Module } from '@nestjs/common';
import { OpponentPlayerController } from './oppPlayer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OpponentPlayerSchema } from './oppPlayer.model';
import { OpponentPlayerService } from './oppPlayer.service';
import { RuleSchema } from 'src/rules/rule.model';
import { RuleService } from 'src/rules/rule.service';
import { UserSchema } from 'src/user/user.model';
import { OpponentTeamSchema } from 'src/opponentTeam/oppTeam.model';
import { OpponentTeamService } from 'src/opponentTeam/oppTeam.services';
// import { TeamModulebb } from 'src/team/teams.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'OpponentPlayer', schema: OpponentPlayerSchema },
      { name: 'OpponentTeam', schema: OpponentTeamSchema },
      { name: 'Rule', schema: RuleSchema },
      { name: 'User', schema: UserSchema },
    ]),
    // forwardRef(() => TeamModulebb),
  ],
  controllers: [OpponentPlayerController],
  providers: [OpponentPlayerService, OpponentTeamService, RuleService],
})
export class OpponentPlayerModule {}
