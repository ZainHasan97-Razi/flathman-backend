import {Injectable, BadRequestException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ShareAccount, ShareAccountStatusEnum } from './share-account.model';
import { RequestUserType } from 'src/common/common.types';
import { UpdateShareAccountStatusDto } from './dto/update.status.dto';
import { EmailService } from 'src/email/email.service';
import { SendAccountShareInviteTemplate } from 'src/common/templates/send-account-share-invite.template';

@Injectable()
export class ShareAccountService {
  constructor(
    @InjectModel('ShareAccount') private shareAccountModel: Model<ShareAccount>,
    private emailService: EmailService,
  ) {}

  async sendInvite(guestEmail: string, ownerData: RequestUserType) {
    // If invite is already sent then dont create another entry maybe just email should be resent
    // Incase an old invite is accepted or revoke a new invite could be sent
    try {
      const inviteExist = await this.shareAccountModel.findOne({
        ownerId: ownerData._id, guestEmail, status: {$in: [ShareAccountStatusEnum.pending]}
      });
      if(inviteExist) throw new BadRequestException("Invite already sent to this user!")
  
      const response = await this.shareAccountModel.create({
        ownerId: ownerData._id, 
        ownerEmail: ownerData.email, 
        guestEmail, 
        status: ShareAccountStatusEnum.pending
      })
      await this.emailService.sendEmail(
        guestEmail.toLowerCase(),
        "Invitation for account sharing",
        "This is an invitation for account sharing",
        {html: SendAccountShareInviteTemplate(ownerData.email, guestEmail, ownerData.email)}
      )

      return response;
    } catch (e) {
      throw e
    }
  }

  updateStatus(data: UpdateShareAccountStatusDto) {
    return this.shareAccountModel.findByIdAndUpdate(data.inviteId, {status: data.status})
  }

  sharedAccountsList(guestEmail: string) {
    return this.shareAccountModel.find({guestEmail, status: ShareAccountStatusEnum.accepted})
  }

}
