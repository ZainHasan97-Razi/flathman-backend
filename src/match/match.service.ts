import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { CompleteSuspendedMatchDto } from './dto/completeSuspendedMatch.match.dto';
import { CreateMatchDto } from './dto/create.match.dto';
import { SuspendMatchDto } from './dto/suspend.match.dto';
import { UpdateMatchDto } from './dto/update.match.dto';
import { GameStatusEnum } from './match.model';
import { MongoIdType } from 'src/common/common.types';
import mongoose from 'mongoose';
import { CreatePlayerDto } from 'src/player/dto/create.player.dto';
const isEmpty = require("is-empty");

@Injectable()
export class MatchService {
  constructor(
    @InjectModel('Match') private matchModel: Model<CreateMatchDto>,
    @InjectModel('User') private userModel: Model<CreateUserDto>,
    @InjectModel('Player') private playerModel: Model<CreatePlayerDto>,
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
    try {
      const userExist = this.userModel.findOne({
        _id: body.userId,
        deletedAt: null,
      });
      if (!userExist) {
        throw new NotFoundException(`Couldn't found User`);
      }
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

  async gameResultsAndScheduleListByLicensedTeam(teamId: MongoIdType, hasScheduledGames: boolean = false) {
    const scheduledGameFilters = {
      "$or": [
        {gameStatus:  GameStatusEnum.scheduled},
        {gameStatus:  GameStatusEnum.forfeit},
      ]
    }
    const data = await this.matchModel.aggregate([
      {$match: {
        "teamA.teamId": teamId, deletedAt: null,
        ...(hasScheduledGames ? scheduledGameFilters : {})
      }},
      {
        $addFields: {
          createdAtUnix: {
            $divide: [
              {$toLong: {$toDate: "$createdAt"}},
              1000
            ]
          }
        }
      },
      {
        $addFields: {
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

  async gameResultCounts(teamId: MongoIdType) {
    const data = await this.matchModel.aggregate([
      { $match: { "teamA.teamId": teamId, deletedAt: null } },
      {
        $facet: {
          conference: [
            { $match: { conference: true } },
            {
              $group: {
                _id: null,
                won: {
                  $sum: {
                    $sum: {
                      $cond: [{ $eq: ["$gameResult", "Won"] }, 1, 0],
                    },
                  },
                },
                lost: {
                  $sum: {
                    $cond: [{ $eq: ["$gameResult", "Lost"] }, 1, 0],
                  },
                },
                tied: {
                  $sum: {
                    $cond: [{ $eq: ["$gameResult", "Tied"] }, 1, 0],
                  },
                },
              },
            },
            {
              $project: { _id: 0, won: 1, lost: 1, tied: 1 },
            },
          ],
          overall: [
            {
              $group: {
                _id: null,
                won: {
                  $sum: {
                    $cond: [{ $eq: ["$gameResult", "Won"] }, 1, 0],
                  },
                },
                lost: {
                  $sum: {
                    $cond: [{ $eq: ["$gameResult", "Lost"] }, 1, 0],
                  },
                },
                tied: {
                  $sum: {
                    $cond: [{ $eq: ["$gameResult", "Tied"] }, 1, 0],
                  },
                },
              },
            },
            {
              $project: { _id: 0, won: 1, lost: 1, tied: 1 },
            },
          ],
        },
      },
      {
        $addFields: {
          conference: {
            $arrayElemAt: ["$conference", 0],
          },
          overall: {
            $arrayElemAt: ["$overall", 0],
          },
        },
      },
    ]);
    return data[0];
  }

  async playersUpdateCheck(matchId: MongoIdType) {
    // const match = await this.matchModel.findById(matchId);
    // if (isEmpty(match)) {
    //   throw new NotFoundException(`Couldn't found match`);
    // }
    // const teamA = match.teamA;
    // const teamAId = new mongoose.Types.ObjectId(match.teamA.teamId);
    // const noNamePlayers = teamA.players.filter(p => p.playerName && p.playerName.includes("New Player"));
    // const jerseyKey = teamA.isHomeTeam ? "homeJersey" : "awayJersey";
    // const noNamePlayersJerseys = noNamePlayers.map(p => teamA.isHomeTeam ? p.homeJersey : p.awayJersey);
    // // Query for players: {teamId: ObjectId('68ed1073a9f82e0fd794ff6e'), ...(teamA.isHomeTeam ? {homeJersey: "44"} : {awayJersey: "44"})}
    // if (noNamePlayersJerseys.length == 0) return [];

    // const teamAPlayers = await this.playerModel.find({
    //   teamId: teamAId,
    //   ...(teamA.isHomeTeam ? { homeJersey: { $in: noNamePlayersJerseys } } : { awayJersey: { $in: noNamePlayersJerseys } }),
    //   playerName: { $not: { $regex: "New Player", $options: "i" } } // case-insensitive match
    // });

    // if (teamAPlayers.length == 0) return [];

    // const matchingPlayers = teamAPlayers.filter(p => noNamePlayersJerseys.includes(p[jerseyKey]));
    // return matchingPlayers;

    const match = await this.matchModel.findById(matchId);
    if (!match) throw new NotFoundException(`Couldn't find match`);

    const { teamA } = match;
    const teamAId = new mongoose.Types.ObjectId(teamA.teamId);
    const jerseyKey = teamA.isHomeTeam ? "homeJersey" : "awayJersey";

    const noNamePlayersJerseys = teamA.players
      .filter(p => p.playerName?.includes("New Player"))
      .map(p => String(p[jerseyKey]));

    if (noNamePlayersJerseys.length === 0) return [];

    return this.playerModel.find({
      teamId: teamAId,
      [jerseyKey]: { $in: noNamePlayersJerseys },
      playerName: { $not: { $regex: "New Player", $options: "i" } },
    });
  }
}
