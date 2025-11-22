import {Injectable, BadRequestException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ShareAccount, ShareAccountDocument, ShareAccountStatusEnum, ShareAccountStatusEnumType } from './share-account.model';
import { MongoIdType, RequestUserType } from 'src/common/common.types';
import { AcceptInviteDto, UpdateShareAccountStatusDto } from './dto/update.status.dto';
import { EmailService } from 'src/email/email.service';
import { SendAccountShareInviteTemplate } from 'src/common/templates/send-account-share-invite.template';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { ThanksForInvitationAcceptanceTemplate } from 'src/common/templates/thanks-for-invitation-acceptence.template';
import { InvitedTeamsDto, SendInviteDto } from './dto/send.invite.dto';
import { CreateTeamDto } from 'src/team/dto/create.team.dto';
import mongoose from 'mongoose';
import { UpdateInviteDto } from './dto/update.invite.dto';
const isEmpty = require("is-empty");

type InviteListFilters = {
  status?: ShareAccountStatusEnumType,
  role?: string,
}

@Injectable()
export class ShareAccountService {
  constructor(
    @InjectModel('ShareAccount') private shareAccountModel: Model<ShareAccount>,
    @InjectModel('User') private userModel: Model<CreateUserDto>,
    @InjectModel('Team') private teamModel: Model<CreateTeamDto>,
    private emailService: EmailService,
  ) {}

  async sendInvite(data: SendInviteDto, ownerData: RequestUserType) {
    // If invite is already sent then dont create another entry maybe just email should be resent
    // Incase an old invite is accepted or revoke a new invite could be sent
    try {
      const inviteExist = await this.shareAccountModel.findOne({
        ownerId: ownerData._id, guestEmail: data.guestEmail, status: {$in: [ShareAccountStatusEnum.pending, ShareAccountStatusEnum.accepted]}
      });
      if(inviteExist) throw new BadRequestException("Invite already sent to this user!")

      // let teams: MongoIdType[] = [];
      let teams: InvitedTeamsDto[] = [];
      let teamIds: MongoIdType[] = data.teams.map(t => new mongoose.Types.ObjectId(t.teamId));
      let validTeams = await this.teamModel.find({_id: {$in: teamIds}});
      if(validTeams.length === data.teams.length) {
        // teams = data.teams.map(id => new mongoose.Types.ObjectId(id));
        teams = data.teams;
      } else {
        // teams = validTeams?.map(t => t._id) || [];
        teams = validTeams?.map(t => {
          const role = data.teams.find(team => team.teamId.toString() === t._id.toString())?.role
          return {teamId: t._id, role: role} as InvitedTeamsDto
        })
      }
      if(teams.length === 0) throw new BadRequestException("No valid team found!")
  
      const createdInvite = await this.shareAccountModel.create({
        ownerId: ownerData._id, 
        ownerEmail: ownerData.email, 
        guestEmail: data.guestEmail, 
        guestName: data.guestName,
        status: ShareAccountStatusEnum.pending,
        // role: data.role,
        teams,
      })
      await this.emailService.sendEmail(
        data.guestEmail.toLowerCase(),
        "Invitation for account sharing",
        "This is an invitation for account sharing",
        {html: SendAccountShareInviteTemplate(ownerData.userName, data.guestEmail, ownerData.email, createdInvite._id.toString())}
      )

      return createdInvite;
    } catch (e) {
      throw e
    }
  }

  async updateInvite(inviteId: MongoIdType, body: UpdateInviteDto) {
    return await this.shareAccountModel.findByIdAndUpdate(inviteId, body, {new: true});
  }

  async acceptInvite(body: AcceptInviteDto&{status: ShareAccountStatusEnumType}) {
    const invitationInfo: ShareAccountDocument&{ownerId: CreateUserDto} = await this.shareAccountModel.findById(body.inviteId).populate("ownerId");    
    if(isEmpty(invitationInfo)) throw new BadRequestException("Invalid invite id!")
      
    await this.emailService.sendEmail(
      invitationInfo.guestEmail.toLowerCase(),
      "Thanks for accepting invitation",
      "This is an confirmation of invitation acceptance",
      {html: ThanksForInvitationAcceptanceTemplate(
        invitationInfo.guestName, 
        invitationInfo.ownerId?.userName || invitationInfo.ownerEmail, 
      )}
    )
    return await this.shareAccountModel.findByIdAndUpdate(body.inviteId, {status: body.status}, {new: true});
  }

  async updateStatus(data: UpdateShareAccountStatusDto, guestData: RequestUserType) {
    return await this.shareAccountModel.findByIdAndUpdate(data.inviteId, {status: data.status}, {new: true});
  }

  sharedAccountsList(guestEmail: string) {
    return this.shareAccountModel.find({guestEmail, status: ShareAccountStatusEnum.accepted})
  }

  getInvitedUsers(ownerEmail: string, filters: InviteListFilters) {
    const query = {ownerEmail, ...filters, ...(filters?.status ? {} : {status: {$in: [ShareAccountStatusEnum.accepted, ShareAccountStatusEnum.pending]}})}
    // console.log("query getInvitedUsers::: ", query);
    return this.shareAccountModel.find(query).lean();
  }

  async getInvitations(guestEmail: string, filters: InviteListFilters) {
    const query = {guestEmail, ...filters, ...(filters?.status ? {} : {status: {$in: [ShareAccountStatusEnum.accepted, ShareAccountStatusEnum.pending]}})}
    // console.log("query getInvitations::: ", query);
    return await this.shareAccountModel.find(query).populate("ownerId").lean();
  }

  findByGuestAndHostEmails(guestEmail: string, ownerEmail: string) {
    return this.shareAccountModel.findOne({guestEmail, ownerEmail})
  }

  async getInvitationStatus(
    guestEmail: string, 
    hostEmail: string
  ): Promise<{invitationStatus: ShareAccountStatusEnumType|"not_found", guestIsRegistered: boolean}> {

    const guestData = await this.userModel.findOne({email: guestEmail, deletedAt: null});
    const invitation = await this.findByGuestAndHostEmails(guestEmail, hostEmail);
    
    return {
      invitationStatus: invitation?.status || "not_found",
      guestIsRegistered: !isEmpty(guestData)
    }
  }

}
