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
import { TeamService } from 'src/team/teams.services';
import { TeamSchema } from 'src/team/teams.model';
import { PlayerSchema } from 'src/player/player.model';
import { PlayerService } from 'src/player/player.service';
import { StatsConfigSchema } from 'src/statsConfig/statsConfig.model';
import { StatsConfigService } from 'src/statsConfig/statsConfig.service';
// import { TeamModulebb } from 'src/team/teams.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'OpponentPlayer', schema: OpponentPlayerSchema },
      { name: 'OpponentTeam', schema: OpponentTeamSchema },
      { name: 'Rule', schema: RuleSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Team', schema: TeamSchema },
      { name: 'Player', schema: PlayerSchema },
      { name: 'StatsConfig', schema: StatsConfigSchema },
    ]),
  ],
  controllers: [OpponentPlayerController],
  providers: [
    OpponentPlayerService,
    OpponentTeamService,
    RuleService,
    TeamService,
    PlayerService,
    StatsConfigService,
  ],
})
export class OpponentPlayerModule {}
