import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';
// import { HelperService } from 'src/constants/helper.service';
import { EmailService } from 'src/email/email.service';
import { OtpService } from 'src/otp/otp.service';
import { OtpTypeEnum } from 'src/constants/enums';
import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<CreateUserDto>, // private readonly HelperService: HelperService,
    private readonly emailService: EmailService,
    private readonly otpService: OtpService,
  ) {}

  async findAll() {
    try {
      return await this.userModel.find().exec();
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: mongoose.Types.ObjectId) {
    try {
      return await this.userModel.findById(id);
    } catch (e) {
      throw e;
    }
  }

  async delete(id: mongoose.Types.ObjectId) {
    try {
      const response = await this.userModel.findByIdAndUpdate(id, {
        deletedAt: new Date(),
      });
      if (!response) {
        throw new NotFoundException(`Failed to delete user`);
      }
      return response;
    } catch (e) {
      throw e;
    }
  }

  async testEmail() {
    try {
      await this.emailService.sendEmail(
        process.env.TO_EMAIL_TESTER,
        'Test Email',
        'Hi this is a test email from Hashed app',
      );
    } catch (e) {
      throw e;
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userModel.findOne({ email: email.toLowerCase() });
    } catch (e) {
      throw e;
    }
  }

  async sendResetPasswordOtp(email: string, type: string) {
    try {
      const user = await this.findByEmail(email.toLowerCase());
      if (!user) {
        throw new BadRequestException('Invalid user email!');
      }
      await this.otpService.sendEmailOtp(email.toLowerCase(), type, user);
    } catch (e) {
      throw e;
    }
  }

  async confirmResetPasswordOtp(
    email: string,
    code: string,
    password: string,
    type: OtpTypeEnum.reset_password_otp,
  ) {
    try {
      const user = await this.findByEmail(email.toLowerCase());
      if (!user) {
        throw new BadRequestException('Invalid user email!');
      }
      let response = { data: null, message: '' };
      await this.otpService.confirmEmailOtp(email.toLowerCase(), code, type);
      const hashedpassword = await bcrypt.hash(password, 12);
      await this.userModel.findByIdAndUpdate(user._id, {
        password: hashedpassword,
      });
      response.message = 'Password has been updated successfully!';
      return response;
    } catch (e) {
      throw e;
    }
  }
}
