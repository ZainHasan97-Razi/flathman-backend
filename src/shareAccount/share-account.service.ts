import {Injectable, BadRequestException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ShareAccount, ShareAccountStatusEnum, ShareAccountStatusEnumType } from './share-account.model';
import { RequestUserType } from 'src/common/common.types';
import { AcceptInviteDto, UpdateShareAccountStatusDto } from './dto/update.status.dto';
import { EmailService } from 'src/email/email.service';
import { SendAccountShareInviteTemplate } from 'src/common/templates/send-account-share-invite.template';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { ThanksForInvitationAcceptanceTemplate } from 'src/common/templates/thanks-for-invitation-acceptence.template';
import { SendInviteDto } from './dto/send.invite.dto';
const isEmpty = require("is-empty");

@Injectable()
export class ShareAccountService {
  constructor(
    @InjectModel('ShareAccount') private shareAccountModel: Model<ShareAccount>,
    @InjectModel('User') private userModel: Model<CreateUserDto>,
    private emailService: EmailService,
    // private userService: UserService,
  ) {}

  async sendInvite(data: SendInviteDto, ownerData: RequestUserType) {
    // If invite is already sent then dont create another entry maybe just email should be resent
    // Incase an old invite is accepted or revoke a new invite could be sent
    try {
      const inviteExist = await this.shareAccountModel.findOne({
        ownerId: ownerData._id, guestEmail: data.guestEmail, status: {$in: [ShareAccountStatusEnum.pending]}
      });
      if(inviteExist) throw new BadRequestException("Invite already sent to this user!")
  
      const createdInvite = await this.shareAccountModel.create({
        ownerId: ownerData._id, 
        ownerEmail: ownerData.email, 
        guestEmail: data.guestEmail, 
        status: ShareAccountStatusEnum.pending,
        role: data.role
      })
      await this.emailService.sendEmail(
        data.guestEmail.toLowerCase(),
        "Invitation for account sharing",
        "This is an invitation for account sharing",
        {html: SendAccountShareInviteTemplate(ownerData.email, data.guestEmail, ownerData.email, createdInvite._id.toString(), data.role)}
      )

      return createdInvite;
    } catch (e) {
      throw e
    }
  }

  async acceptInvite(body: AcceptInviteDto&{status: ShareAccountStatusEnumType}) {
    const invitationInfo = await this.shareAccountModel.findById(body.inviteId);    
    if(isEmpty(invitationInfo)) throw new BadRequestException("Invalid invite id!")
      
    await this.emailService.sendEmail(
      invitationInfo.ownerEmail.toLowerCase(),
      "Thanks for accepting invitation",
      "This is an confirmation of invitation acceptance",
      {html: ThanksForInvitationAcceptanceTemplate(invitationInfo.guestEmail, invitationInfo.ownerEmail, invitationInfo.role)}
    )
    return await this.shareAccountModel.findByIdAndUpdate(body.inviteId, {status: body.status}, {new: true});
  }

  async updateStatus(data: UpdateShareAccountStatusDto, guestData: RequestUserType) {
    return await this.shareAccountModel.findByIdAndUpdate(data.inviteId, {status: data.status}, {new: true});
  }

  sharedAccountsList(guestEmail: string) {
    return this.shareAccountModel.find({guestEmail, status: ShareAccountStatusEnum.accepted})
  }

  invitationList(hostEmail: string) {
    return this.shareAccountModel.find({hostEmail})
  }

  findByGuestAndHostEmails(guestEmail: string, ownerEmail: string) {
    return this.shareAccountModel.findOne({guestEmail, ownerEmail})
  }

  async getInvitationStatus(
    guestEmail: string, 
    hostEmail: string
  ): Promise<{invitationStatus: ShareAccountStatusEnumType|"not_found", guestIsRegistered: boolean}> {

    const guestData = await this.userModel.findOne({email: guestEmail});
    const invitation = await this.findByGuestAndHostEmails(guestEmail, hostEmail);
    
    return {
      invitationStatus: invitation?.status || "not_found",
      guestIsRegistered: !isEmpty(guestData)
    }
  }

}
