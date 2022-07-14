import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchSchema } from './match.model';
import { MatchService } from './match.service';
import { UserSchema } from 'src/user/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Match', schema: MatchSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [MatchController],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}
