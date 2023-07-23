import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { CompleteSuspendedMatchDto } from './dto/completeSuspendedMatch.match.dto';
import { CreateMatchDto } from './dto/create.match.dto';
import { SuspendMatchDto } from './dto/suspend.match.dto';
import { UpdateMatchDto } from './dto/update.match.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel('Match') private matchModel: Model<CreateMatchDto>,
    @InjectModel('User') private userModel: Model<CreateUserDto>,
  ) {}

  async findAll() {
    try {
      const response = await this.matchModel
        .find({ isSuspended: false })
        .exec();
      return response;
    } catch (e) {
      // throw new NotFoundException(`Couldn't found any match logs`);
      throw e;
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.matchModel.findById(id);
      if (!response) {
        throw new NotFoundException(`Couldn't found match log`);
      }
      return response;
    } catch (e) {
      throw e;
    }
  }

  async findUserSuspendedLogs(id: string) {
    try {
      const response = await this.matchModel
        .find({ userId: id, isSuspended: true })
        .exec();
      return response;
    } catch (e) {
      // throw new NotFoundException(`Couldn't found any match logs`);
      throw e;
    }
  }

  async findUserLogs(id: string) {
    try {
      return await this.matchModel
        .find({ userId: id, isSuspended: false })
        .exec();
    } catch (e) {
      // throw new NotFoundException(`Couldn't found User's logs`);
      throw e;
    }
  }

  async create(data: CreateMatchDto) {
    try {
      const userExist = this.userModel.findOne(data.userId);
      if (!userExist) {
        throw new NotFoundException(`Couldn't found User`);
      }
      let payload = data;
      if (Number(payload.teamA.goals) === Number(payload.teamB.goals)) {
        payload.teamA.status = 'Tied';
        payload.teamB.status = 'Tied';
      } else if (Number(payload.teamA.goals) > Number(payload.teamB.goals)) {
        payload.teamA.status = 'Won';
        payload.teamB.status = 'Lost';
      } else {
        payload.teamA.status = 'Lost';
        payload.teamB.status = 'Won';
      }
      const savedMatch = await this.matchModel.create(data);
      if (savedMatch) {
        return {
          message: `Match has been saved successfully!`,
        };
      }
    } catch (e) {
      // console.log('Err createTeam => ', e);
      throw e;
    }
  }

  async update(data: UpdateMatchDto) {
    try {
      const userExist = this.userModel.findByIdAndUpdate(data.matchId, data);
      if (!userExist) {
        throw new NotFoundException(`Couldn't found User`);
      }
      const savedMatch = await this.matchModel.findOne(data);
      if (savedMatch) {
        return {
          message: `Match has been saved successfully!`,
        };
      }
    } catch (e) {
      // console.log('Err createTeam => ', e);
      throw e;
    }
  }

  async suspend(data: SuspendMatchDto) {
    try {
      const userExist = this.userModel.findOne(data.userId);
      if (!userExist) {
        throw new NotFoundException(`Couldn't found User`);
      }
      const savedMatch = await this.matchModel.create({
        ...data,
        isSuspended: true,
      });
      if (savedMatch) {
        return {
          message: `Match has been suspended successfully!`,
        };
      }
    } catch (e) {
      throw e;
    }
  }

  async endSuspendedGame(data: CompleteSuspendedMatchDto) {
    try {
      const suspendedGame = await this.matchModel.findById(
        // new mongoose.Types.ObjectId(data.matchId),
        data.matchId,
      );
      if (!suspendedGame) {
        throw new NotFoundException(`Couldn't found suspended game`);
      }
      const completedGame = await this.matchModel.findByIdAndUpdate(
        // new mongoose.Types.ObjectId(data.matchId),
        data.matchId,
        { ...data, isSuspended: false },
      );
      if (completedGame) {
        return {
          message: `Suspended match has been marked completed successfully!`,
        };
      }
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string) {
    try {
      await this.matchModel.findByIdAndDelete(id);
    } catch (e) {
      throw e;
    }
  }
}
