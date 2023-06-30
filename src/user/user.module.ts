import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { UserService } from './user.service';
import { EmailModule } from 'src/email/email.module';
import { OtpModule } from 'src/otp/otp.module';
import { OtpService } from 'src/otp/otp.service';
import { OtpSchema } from 'src/otp/otp.model';
import { EmailService } from 'src/email/email.service';
// import { HelperService } from 'src/constants/helper.service';
// import { TeamModule } from 'src/team/team.module';

@Module({
  imports: [
    EmailModule,
    OtpModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Otp', schema: OtpSchema },
    ]),
    // forwardRef(() => OtpModule),
  ],
  controllers: [UserController],
  providers: [UserService, OtpService, EmailService],
  exports: [UserService],
})
export class UserModule {}
