import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScheduleGameDto } from './dto/create.scheduleGame.dto';
import {
  ScheduleStatusEnum,
  ScheduleStatusEnumType,
} from './scheduleGame.schema';
import { MongoIdType } from 'src/common/common.types';
import { UpdateScheduleGameDto } from './dto/update.scheduleGame.dto';

@Injectable()
export class ScheduleGameService {
  constructor(
    @InjectModel('ScheduleGame')
    private scheduleGameModel: Model<CreateScheduleGameDto>,
  ) {}

  async create(body: CreateScheduleGameDto) {
    try {
      return await this.scheduleGameModel.create(body);
    } catch (e) {
      throw e;
    }
  }

  async update(id: MongoIdType, body: UpdateScheduleGameDto) {
    try {
      return await this.scheduleGameModel.findByIdAndUpdate(id, body, {
        new: true,
      });
    } catch (e) {
      throw e;
    }
  }

  async updateStatus(id: MongoIdType, status: ScheduleStatusEnumType) {
    try {
      const scheduleGame = await this.scheduleGameModel.findById(id);
      if (!scheduleGame) {
        throw new NotFoundException('ScheduleGame not found!');
      }
      scheduleGame.status = status;
      return await scheduleGame.save();
    } catch (e) {
      throw e;
    }
  }

  findById(id: MongoIdType) {
    try {
      return this.scheduleGameModel.findById(id).lean().populate("teamId opponentTeam");
    } catch (e) {
      throw e;
    }
  }

  findByUserId(userId: MongoIdType) {
    try {
      return this.scheduleGameModel.find({
        userId,
        status: ScheduleStatusEnum.active,
      }).lean().populate("teamId opponentTeam");
    } catch (e) {
      throw e;
    }
  }

  findByTeamId(teamId: MongoIdType) {
    try {
      return this.scheduleGameModel.find({
        teamId,
        status: ScheduleStatusEnum.active,
      }).lean().populate("teamId opponentTeam");
    } catch (e) {
      throw e;
    }
  }
}
