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
import { GameResultEnum, GameResultEnumType } from './match.model';
import { MongoIdType } from 'src/common/common.types';
const isEmpty = require("is-empty");

@Injectable()
export class MatchService {
  constructor(
    @InjectModel('Match') private matchModel: Model<CreateMatchDto>,
    @InjectModel('User') private userModel: Model<CreateUserDto>,
  ) {}

  async findAll() {
    try {
      return await this.matchModel.find({deletedAt: null}).lean();
    } catch (e) {
      // throw new NotFoundException(`Couldn't found any match logs`);
      throw e;
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.matchModel.findById(id).lean();
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

  async create(body: CreateMatchDto) {
    // console.log("calling");
    try {
      const userExist = this.userModel.findOne({
        _id: body.userId,
        deletedAt: null,
      });
      if (!userExist) {
        throw new NotFoundException(`Couldn't found User`);
      }
      // let payload = body;
      // if(payload.teamA.goals && payload.teamB.goals) {
      //   if(isEmpty(payload.teamA.goals) && isEmpty(payload.teamB.goals)) {
      //     payload.teamA.status = GameResultEnum.tied;
      //     payload.teamB.status = GameResultEnum.tied;
      //     // payload["gameResult"] = GameResultEnum.tied as GameResultEnumType;
      //     // console.log("case 1");
      //   } else if(isEmpty(payload.teamA.goals) && !isEmpty(payload.teamB.goals)) {
      //     payload.teamA.status = GameResultEnum.lost;
      //     payload.teamB.status = GameResultEnum.won;
      //     // payload["gameResult"] = GameResultEnum.lost as GameResultEnumType;
      //     // console.log("case 2");
      //   } else if(!isEmpty(payload.teamA.goals) && isEmpty(payload.teamB.goals)) {
      //     payload.teamA.status = GameResultEnum.won;
      //     payload.teamB.status = GameResultEnum.lost;
      //     // payload["gameResult"] = GameResultEnum.won as GameResultEnumType;
      //     // console.log("case 3");
      //   } else if (Number(payload.teamA.goals) === Number(payload.teamB.goals)) {
      //     payload.teamA.status = GameResultEnum.tied;
      //     payload.teamB.status = GameResultEnum.tied;
      //     // payload["gameResult"] = GameResultEnum.tied as GameResultEnumType;
      //     // console.log("case 4");
      //   } else if (Number(payload.teamA.goals) > Number(payload.teamB.goals)) {
      //     payload.teamA.status = GameResultEnum.won;
      //     payload.teamB.status = GameResultEnum.lost;
      //     // payload["gameResult"] = GameResultEnum.won as GameResultEnumType;
      //     // console.log("case 5");
      //   } else if (Number(payload.teamA.goals) < Number(payload.teamB.goals)) {
      //     payload.teamA.status = GameResultEnum.lost;
      //     payload.teamB.status = GameResultEnum.won;
      //     // payload["gameResult"] = GameResultEnum.lost as GameResultEnumType;
      //     // console.log("case 6");
      //   }
      // }
      // console.log("payload::: ", payload);
      const savedMatch = await this.matchModel.create(body);
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

  async update(id: MongoIdType, body: UpdateMatchDto) {
    try {
      return await this.matchModel.findByIdAndUpdate(id, body, {
        new: true,
      });
    } catch (e) {
      // console.log('Err createTeam => ', e);
      throw e;
    }
  }

  async suspend(data: SuspendMatchDto) {
    try {
      const userExist = this.userModel.findOne({
        _id: data.userId,
        deletedAt: null,
      });
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

  async findByLicensedTeamId(id: string) {
    try {
      return await this.matchModel.find({ 'teamA.teamId': id });
    } catch (e) {
      throw e;
    }
  }

  async gameResultsAndScheduleListByLicensedTeam(teamId: MongoIdType) { // not going to use currently becz effectiveDateTime is set in game end result as an another approach
    const data = await this.matchModel.aggregate([
      {$match: {"teamA.teamId": teamId, deletedAt: null}},
      {
        $addFields: {
          createdAtUnix: { $toLong: { $toDate: "$createdAt" } },
          effectiveDateTime: {
            $ifNull: ["$effectiveDateTime", "$createdAtUnix"]
          }
        }
      },
      {
        $sort: { effectiveDateTime: 1 }
      }
    ])
    // console.log("dataaaa: ", data);
    return data;
  }
}
