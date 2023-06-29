import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { UserService } from './user.service';
import { EmailModule } from 'src/email/email.module';
// import { HelperService } from 'src/constants/helper.service';
// import { TeamModule } from 'src/team/team.module';

@Module({
  imports: [
    EmailModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
