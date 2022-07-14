import { forwardRef, Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from './player.model';
import { PlayerService } from './player.service';
import { TeamService } from 'src/team/teams.services';
import { TeamSchema } from 'src/team/teams.model';
import { RuleSchema } from 'src/rules/rule.model';
import { RuleService } from 'src/rules/rule.service';
import { UserSchema } from 'src/user/user.model';
// import { TeamModulebb } from 'src/team/teams.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Player', schema: PlayerSchema },
      { name: 'Team', schema: TeamSchema },
      { name: 'Rule', schema: RuleSchema },
      { name: 'User', schema: UserSchema },
    ]),
    // forwardRef(() => TeamModulebb),
  ],
  controllers: [PlayerController],
  providers: [PlayerService, TeamService, RuleService],
})
export class PlayerModule {}
