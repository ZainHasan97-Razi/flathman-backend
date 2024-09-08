import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeamDto } from './dto/create.team.dto';
import { UpdateTeamDto } from './dto/update.team.dto';
import { RuleService } from 'src/rules/rule.service';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { CreatePlayerDto } from 'src/player/dto/create.player.dto';
import { PlayerService } from 'src/player/player.service';
import { CreateRuleDto } from 'src/rules/dto/create.rule.dto';
import mongoose from 'mongoose';
import { MongoIdType } from 'src/common/common.types';
import { defalt_penalty_options, defalt_turnover_options, default_penalty_time_options, default_stats_rating, penaltyOptionSlugsEnumType, SettingNameEnumType } from './teams.model';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel('Team') private teamModel: Model<CreateTeamDto>,
    @InjectModel('User') private userModel: Model<CreateUserDto>,
    @InjectModel('Player') private playerModel: Model<CreatePlayerDto>,
    @InjectModel('Rule') private ruleModel: Model<CreateRuleDto>,
    private readonly ruleService: RuleService,
    private readonly playerService: PlayerService,
  ) {}

  async findAll() {
    try {
      const response = await this.teamModel.find().exec();
      return response;
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string) {
    try {
      const team = await this.findOne(id);
      if (team) {
        const deletedTeam = await this.teamModel.findByIdAndDelete(id);
        if (!deletedTeam) {
          throw new InternalServerErrorException(`Couldn't delete team`);
        }
        const teamPlayers = await this.playerModel.find({ teamId: id });
        // const teamPlayers = await this.playerService.findTeamPlayers(id);
        if (teamPlayers) {
          teamPlayers.map(async (v) => {
            await this.playerService.delete(id);
          });
        }
        const remainingPlayers = await this.playerModel.find({ teamId: id });
        // const remainingPlayers = await this.playerService.findTeamPlayers(id);
        if (remainingPlayers.length === 0) {
          return `All players of team deletd successfully`;
        }
      }
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.teamModel.findById(id).populate('gameRules');
      //Maximillian
      return response;
    } catch (e) {
      throw e;
    }
  }

  async findMyTeam(id: mongoose.Types.ObjectId) {
    try {
      const response = await this.teamModel.find({ teamOwner: id }).exec();
      return response;
    } catch (e) {
      throw e;
    }
  }

  async createTeam(data: CreateTeamDto) {
    try {
      await this.teamOwnerExist(data.teamOwner);
      const ruleData = await this.ruleModel.findById(data.gameRules);
      return await this.teamModel.create({...data, game_rules_setting: ruleData});
    } catch (e) {
      throw e;
    }
  }

  async updateTeam(data) {
    try {
      let team = await this.teamModel.findById(data.teamId);
      if (!team) {
        throw new NotFoundException(`Team ${data.teamNickName} doesn't exist`);
      }
      if(data.gameRules) {
        const ruleIsChanged = (data.gameRules?._id || data.gameRules) != team.gameRules;
        if(ruleIsChanged) {
          const newRuleData = await this.ruleModel.findById(data.gameRules);
          await this.teamModel.findOneAndUpdate(
            { _id: data.teamId }, // filter team with _id
            { ...data, game_rules_setting: newRuleData },
          );
        } else {
          await this.teamModel.findOneAndUpdate(
            { _id: data.teamId }, // filter team with _id
            { ...data },
          );
        }
      } else {
        await this.teamModel.findOneAndUpdate(
          { _id: data.teamId }, // filter team with _id
          { ...data },
        );
      }
      return { message: 'Team has been updated successfully!' };
    } catch (e) {
      throw e;
    }
  }

  teamnameIsUnique = async (teamname: string) => {
    const result = await this.teamModel.findOne({ teamName: teamname });
    if (result) {
      throw new ConflictException('Team name already exist!');
    }
  };

  teamOwnerExist = async (ownerId: string) => {
    const result = await this.userModel.findOne({
      teamOwner: ownerId,
      deletedAt: null,
    });
    if (!result) {
      throw new ConflictException(`Team owner doesn't exist!`);
    }
  };

  async getDefaultSettingData(settingName: SettingNameEnumType, teamId: MongoIdType, penaltyOptionName: penaltyOptionSlugsEnumType = null) {
    let settingDefaultPayload;
    
      switch(settingName) {
        case "penalty_time_options":
          settingDefaultPayload = {penalty_time_options: default_penalty_time_options}
          break;
        case "penalty_options":
          if(penaltyOptionName) {
            let {penalty_options} = await this.teamModel.findById(teamId).lean() as any;
            if(penalty_options) {
              const index = penalty_options.findIndex(opt => opt.name === penaltyOptionName);
              penalty_options[index] = defalt_penalty_options.find(opt => opt.name === penaltyOptionName);
              settingDefaultPayload = {penalty_options};
            } else {
              settingDefaultPayload = {penalty_options: defalt_penalty_options}
            }
          } else {
            settingDefaultPayload = {penalty_options: defalt_penalty_options}
          }
          break;
        case "stats_rating":
          settingDefaultPayload = {stats_rating: default_stats_rating}
          break;
        case "turnover_options":
          settingDefaultPayload = {turnover_options: defalt_turnover_options}
          break;
        case "game_rules_setting":
          let {gameRules} = await this.teamModel.findById(teamId).lean().populate("gameRules");
          settingDefaultPayload = {game_rules_setting: gameRules};
          break;
      }
    return settingDefaultPayload;
  }

  async resetTeamSetting(settingName: SettingNameEnumType, teamId: MongoIdType, penaltyOptionName: penaltyOptionSlugsEnumType = null) {
    let settingDefaultPayload = await this.getDefaultSettingData(settingName, teamId, penaltyOptionName);
    return await this.teamModel.findByIdAndUpdate(teamId, settingDefaultPayload, {new: true})
  }
}
