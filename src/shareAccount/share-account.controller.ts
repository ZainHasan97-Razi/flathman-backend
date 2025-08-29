import { Body, Controller, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { ShareAccountService } from './share-account.service';
import { SendInviteDto } from './dto/send.invite.dto';
import { RequestUserType } from 'src/common/common.types';
import { AcceptInviteDto, UpdateShareAccountStatusDto } from './dto/update.status.dto';
import { ShareAccountStatusEnum } from './share-account.model';

@Controller('share-account')
export class ShareAccountController {
  constructor(private readonly shareAccountService: ShareAccountService) {}

  @Post('send')
  sendInvite(@Body() body: SendInviteDto, @Request() req: Request&{user: RequestUserType}) {
    return this.shareAccountService.sendInvite(body, req.user);
  }

  @Patch('accept')
  acceptInvite(@Body() body: AcceptInviteDto) {
    return this.shareAccountService.acceptInvite({inviteId: body.inviteId, status: ShareAccountStatusEnum.accepted})
  }

  @Patch('status')
  updateStatus(@Body() body: UpdateShareAccountStatusDto, @Request() req: Request&{user: RequestUserType}) {
    return this.shareAccountService.updateStatus(body, req.user)
  }

  @Get("list/:email")
  sharedAccountsList(@Param('email') email: string) {
    return this.shareAccountService.sharedAccountsList(email)
  }

  @Get("invitation-list/:hostEmail")
  invitationList(@Param('hostEmail') hostEmail: string) {
    return this.shareAccountService.invitationList(hostEmail)
  }

  @Get("status/:guestEmail/:hostEmail")
  getInvitationStatus(@Param('guestEmail') guestEmail: string, @Param('hostEmail') hostEmail: string) {
    return this.shareAccountService.getInvitationStatus(guestEmail, hostEmail)
  }

}
