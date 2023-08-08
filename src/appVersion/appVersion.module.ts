import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from 'src/email/email.module';
import { OtpModule } from 'src/otp/otp.module';
import { AppVersionSchema } from './appVersion.model';
import { AppController } from 'src/app.controller';
import { AppVersionService } from './appVersion.service';
import { AppVersionController } from './appVersion.controller';

@Module({
  imports: [
    EmailModule,
    OtpModule,
    MongooseModule.forFeature([
      { name: 'AppVersion', schema: AppVersionSchema },
    ]),
  ],
  controllers: [AppVersionController],
  providers: [AppVersionService],
  // exports: [TeamService],
})
export class AppVersionModule {}
