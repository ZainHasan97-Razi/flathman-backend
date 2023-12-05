import { Controller, Body, Post, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { OtpService } from 'src/otp/otp.service';
import { OtpTypeEnum } from 'src/constants/enums';
import { ConfirmResetPasswordDto } from './dto/confirm.reset.pass.dto';
import { MongoIdValidationPipe } from 'src/common/pipes/mongoid.validation.pipe';
import mongoose from 'mongoose';

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
  findOne(@Param('id', MongoIdValidationPipe) id: mongoose.Types.ObjectId) {
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

  @Delete('delete-account/:id')
  delete(@Param('id', MongoIdValidationPipe) id: mongoose.Types.ObjectId) {
    return this.userService.delete(id);
  }
}
