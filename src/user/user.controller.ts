import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { OtpService } from 'src/otp/otp.service';
import { OtpTypeEnum } from 'src/constants/enums';
import { ConfirmResetPasswordDto } from './dto/confirm.reset.pass.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly otpService: OtpService,
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('test-email')
  testEmail() {
    return this.userService.testEmail();
  }

  @Post('send-reset-otp')
  sendResetPasswordOtp(@Body() body: { email: string }) {
    return this.userService.sendResetPasswordOtp(
      body.email.toLowerCase(),
      OtpTypeEnum.reset_password_otp,
    );
  }

  @Post('confirm-reset-otp')
  confirmResetPasswordOtp(@Body() body: ConfirmResetPasswordDto) {
    return this.userService.confirmResetPasswordOtp(
      body.email.toLowerCase(),
      body.code,
      body.password,
      OtpTypeEnum.reset_password_otp,
    );
  }
}
