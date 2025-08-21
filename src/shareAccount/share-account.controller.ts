import { Body, Controller, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { ShareAccountService } from './share-account.service';
import { SendDto } from './dto/send.dto';
import { RequestUserType } from 'src/common/common.types';
import { UpdateShareAccountStatusDto } from './dto/update.status.dto';

@Controller('share-account')
export class ShareAccountController {
  constructor(private readonly shareAccountService: ShareAccountService) {}

  @Post('send')
  sendInvite(@Body() body: SendDto, @Request() req: Request&{user: RequestUserType}) {
    return this.shareAccountService.sendInvite(body.guestEmail, req.user);
  }

  @Patch('status')
  acceptInvite(@Body() body: UpdateShareAccountStatusDto, @Request() req: Request&{user: RequestUserType}) {
    return this.shareAccountService.updateStatus(body)
  }

  @Get("list/:email")
  sharedAccountsList(@Param('email') email: string) {
    return this.shareAccountService.sharedAccountsList(email)
  }

}
