import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { UserLoginDto } from './dto/login.dto';
import jwt = require('jsonwebtoken');
// import { HelperService } from '../constants/helper.service';
import { UserService } from 'src/user/user.service';
import { UpdateUserDto } from 'src/user/dto/update.user.dto';
import { UpdateUserDeviceTokenDto } from 'src/user/dto/update.devicetoken.user.dto';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<CreateUserDto>,
    // private readonly HelperService: HelperService,
    private readonly userService: UserService,
  ) {}

  async Signin(body: UserLoginDto) {
    try {
      // await this.HelperService.emailIsUnique(details.email);
      const user = await this.userModel.findOne({
        email: body.email.toLowerCase(),
      });
      if (!user) {
        throw new BadRequestException(`User email doesn't exist`);
      }
      const passwordIsValid = await bcrypt.compare(
        body.password,
        user.password,
      );
      if (!passwordIsValid) {
        throw new BadRequestException('Password is invalid');
      }
      // const token = jwt.sign({ email: body.email }, process.env.SECRET_KEY, {
      const token = jwt.sign(
        { email: body.email.toLowerCase() },
        process.env.SECRET_KEY,
        {
          expiresIn: '100d',
        },
      );
      if (!token) {
        throw new InternalServerErrorException(`Couldn't generate token`);
      }
      // await this.updateUserDeviceToken(user, body.deviceTokens);
      let newUser;
      if (user.isAdmin) {
        newUser = {
          _id: user._id,
          userName: user.userName,
          isAdmin: user.isAdmin,
          email: user.email.toLowerCase(),
          contactNumber: user.contactNumber,
        };
      } else {
        newUser = {
          _id: user._id,
          userName: user.userName,
          email: user.email.toLowerCase(),
          contactNumber: user.contactNumber,
        };
      }

      return { token: token, ...newUser };
    } catch (error) {
      throw error;
    }
  }

  async Create(body: CreateUserDto) {
    try {
      body.email = body.email.toLowerCase();
      await this.emailIsUnique(body.email.toLowerCase());
      await this.usernameIsUnique(body.userName);
      await this.userContactIsUnique(body.contactNumber);

      const hashedpassword = await bcrypt.hash(body.password, 12);

      if (hashedpassword) {
        const user = await this.userModel.create({
          ...body,
          password: hashedpassword,
          // deviceTokens: [body.deviceTokens],
        });

        if (!user) {
          throw new BadRequestException('Registeration failed');
        }
      }
      return { message: `User has been created successfully` };
    } catch (error) {
      throw error;
    }
  }

  async Update(body: UpdateUserDto) {
    try {
      body.email = body.email.toLowerCase();
      if (body.isAdmin) {
        throw new BadRequestException('Inappropriate updation request');
      }
      const userExist = await this.userDoesExist(body.userId);
      let user: object;
      if (body?.password) {
        const hashedpassword = await bcrypt.hash(body.password, 12);
        user = await this.userModel.findByIdAndUpdate(
          { _id: body.userId },
          {
            ...body,
            password: hashedpassword,
          },
        );
      } else {
        user = await this.userModel.findByIdAndUpdate(
          { _id: body.userId },
          body,
        );
      }
      if (!user) {
        throw new BadRequestException('Updation failed');
      }

      return { message: `User has been updated successfully` };
    } catch (error) {
      throw error;
    }
  }

  async updateUserDeviceToken(user, newToken: string) {
    if (!newToken || newToken.length === 0) {
      throw new BadRequestException(`Device token is empty or missing`);
    }
    if (user.deviceTokens.length === 3) {
      let tokensValid = false;
      user?.deviceTokens.map((v, i) => {
        if (v === newToken) {
          tokensValid = true;
        }
      });
      if (tokensValid) {
        return;
      } else {
        throw new BadRequestException('Invalid device token');
      }
    }
    if (user.deviceTokens.length < 3) {
      let tokenAlreadyExist = false;
      user?.deviceTokens.map((v, i) => {
        if (v === newToken) {
          tokenAlreadyExist = true;
        }
      });
      if (tokenAlreadyExist) {
        return;
      } else {
        const resp = await this.userModel.findByIdAndUpdate(user._id, {
          deviceTokens: [...user.deviceTokens, newToken],
        });
        if (!resp) {
          throw new InternalServerErrorException(
            `Couldn't update user's device token`,
          );
        }
      }
    }
  }

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

  userContactIsUnique = async (contactNum: string) => {
    const result = await this.userModel.findOne({ contactNumber: contactNum });
    if (result) {
      throw new ConflictException('Contact number already exist!');
    }
  };

  userDoesExist = async (userId: string) => {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new ConflictException(`User doesn't exist`);
    } else {
      return user;
    }
  };
}
