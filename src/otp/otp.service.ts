import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { Otp } from './otp.model';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { OtpTypeEnum } from 'src/constants/enums';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel('Otp') private readonly otpModel: Model<Otp>,
    private emailService: EmailService,
  ) {}

  async sendEmailOtp(email: string, type: string, user): Promise<string> {
    try {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

      let payload = {
        user: user._id,
        email: user.email.toLowerCase(),
        type: type,
        code: otp,
        expiry: expiry,
      };

      // Store the OTP in MongoDB
      await this.otpModel.create(payload);

      // Send the OTP via email
      this.emailService.sendEmail(
        email.toLowerCase(),
        'Verification',
        `Your reset password code is: ${otp}`,
      );
      return otp;
    } catch (e) {
      throw e;
    }
  }

  async confirmEmailOtp(
    email: string,
    otp: string,
    type: string,
  ): Promise<any> {
    if (type !== OtpTypeEnum.reset_password_otp) {
      throw new InternalServerErrorException('Invalid otp type!');
    }
    const storedOtp = await this.otpModel
      .findOne({
        email: email.toLowerCase(),
        type,
        expiry: { $gt: Date.now() - 86400000 },
      })
      .sort({ createdAt: -1 })
      .exec();

    if (!storedOtp) {
      throw new BadRequestException('Invalid otp!');
    }
    if (storedOtp.isUsed) {
      throw new BadRequestException('Otp is already used!');
    }
    if (storedOtp.code !== otp) {
      throw new BadRequestException('Invalid otp code!');
    }
    if (storedOtp.expiry < Date.now()) {
      throw new BadRequestException('Otp is expired already!');
    }

    // Mark the OTP as used
    storedOtp.isUsed = true;
    await storedOtp.save();

    return storedOtp;
  }
}
