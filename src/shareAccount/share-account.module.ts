import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShareAccountSchema } from './share-account.model';
import { ShareAccountController } from './share-account.controller';
import { ShareAccountService } from './share-account.service';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ShareAccount', schema: ShareAccountSchema },
    ]),
  ],
  controllers: [ShareAccountController],
  providers: [ShareAccountService, EmailService],
  exports: [ShareAccountService],
})
export class ShareAccountModule {}
