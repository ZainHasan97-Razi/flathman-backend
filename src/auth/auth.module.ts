import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.model';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    EmailModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService],
})
export class AuthModule {}
