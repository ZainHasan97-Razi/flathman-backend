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
import jwt = require('jsonwebtoken');
import bcrypt from 'bcryptjs';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<CreateUserDto>, // private readonly HelperService: HelperService,
    private readonly emailService: EmailService,
  ) {}

  async findAll() {
    try {
      const response = await this.userModel.find().exec();
      return response;
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.userModel.findById(id);
      if (!response) {
        throw new NotFoundException(`Couldn't found any user`);
      }
      return response;
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }

  async delete(id: string) {
    try {
      const response = await this.userModel.findByIdAndDelete(id);
      if (!response) {
        throw new NotFoundException(`Couldn't delete user`);
      }
      return response;
    } catch (e) {
      throw e;
    }
  }

  async testEmail() {
    try {
      await this.emailService.sendEmail(
        'zainrazi97@gmail.com',
        'Test Email',
        'Hi this is a test email',
      );
    } catch (e) {
      throw e;
    }
  }
}
