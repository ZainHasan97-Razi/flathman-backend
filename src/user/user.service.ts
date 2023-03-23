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

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<CreateUserDto>, // private readonly HelperService: HelperService,
  ) {}

  async findAll() {
    try {
      const response = await this.userModel.find().exec();
      return response;
    } catch (e) {
      // throw new NotFoundException(`Couldn't found any user`);
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

  // async updateTeam(data: CreateUserDto) {
  //   try {
  //     const team = await this.teamModel.findOne({ teamName: data.teamName });
  //     if (!team) {
  //       throw new NotFoundException(`Team ${data.teamName} doesn't exist`);
  //     }
  //     const updatedTeam = await this.teamModel.findOneAndUpdate({
  //       teamName: data.teamName,
  //       players: data.players,
  //     });
  //     if (updatedTeam) {
  //       return { message: 'Team has been updated successfully!' };
  //     }
  //   } catch (e) {
  //     throw new BadRequestException(`Request failed: Couldn't update team`);
  //   }
  // }
}
