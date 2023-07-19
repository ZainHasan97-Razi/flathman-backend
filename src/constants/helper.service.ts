import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { CreateTeamDto } from 'src/team/dto/create.team.dto';

@Injectable()
export class HelperService {
  constructor(
    @InjectModel('User') private userModel: Model<CreateUserDto>,
    @InjectModel('Team') private teamModel: Model<CreateTeamDto>,
  ) {}

  emailIsUnique = async (emailAddress: string) => {
    const result = await this.userModel.findOne({
      email: emailAddress.toLowerCase(),
    });
    if (result) {
      throw new ConflictException('Email already exist!');
    }
  };

  usernameIsUnique = async (username: string) => {
    const result = await this.userModel.findOne({ userName: username });
    if (result) {
      throw new ConflictException('Username already exist!');
    }
  };

  teamnameIsUnique = async (teamname: string) => {
    const result = await this.teamModel.findOne({ userName: teamname });
    if (result) {
      throw new ConflictException('Team name already exist!');
    }
  };

  // isAdminRegisterRequest = async (isAdmin: boolean) => {
  //   const result = await this.userModel.fin
  // }
}
