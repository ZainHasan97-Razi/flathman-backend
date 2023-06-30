import { Module, forwardRef } from '@nestjs/common';
import { OtpService } from './otp.service';
import { EmailModule } from 'src/email/email.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpSchema } from './otp.model';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Otp', schema: OtpSchema }]),
    EmailModule,
    // UserModule,
    // forwardRef(() => UserModule),
  ],
  providers: [OtpService, EmailService],
  exports: [OtpService],
})
export class OtpModule {}
