import {
  Injectable,
  NotFoundException,
  ConflictException,
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
import {  default_stats_rating, SettingNameEnum, SettingNameEnumType } from './teams.model';
import { StatsConfigService } from 'src/statsConfig/statsConfig.service';
import { ConfigDataHierarchyType } from 'src/statsConfig/statsConfig.model';
const isEmpty = require("is-empty");

@Injectable()
export class TeamService {
  constructor(
    @InjectModel('Team') private teamModel: Model<CreateTeamDto>,
    @InjectModel('User') private userModel: Model<CreateUserDto>,
    @InjectModel('Player') private playerModel: Model<CreatePlayerDto>,
    @InjectModel('Rule') private ruleModel: Model<CreateRuleDto>,
    private readonly ruleService: RuleService,
    private readonly playerService: PlayerService,
    private readonly statsConfigService: StatsConfigService,
  ) {}

  async findAll() {
    try {
      const response = await this.teamModel.find().exec();
      return response;
    } catch (e) {
      throw e;
    }
  }

  async findManyByIds(teamIds: string[]) {
    try {
      const ids = [];
      teamIds.map(_id => {
        if(mongoose.Types.ObjectId.isValid(_id)) ids.push(new mongoose.Types.ObjectId(_id));
      })
      const response = await this.teamModel.find({_id: {$in: ids}}).lean();
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

  /*
  * Populate stats config data into team data if
    teamData has no stats config data(null or empty) like 
    penalty_options, turnover_options, penalty_time_options
  */
  async populateStatsConfigDataIntoTeam(team: object) {
    const configData: ConfigDataHierarchyType[] = await this.statsConfigService.findAll();
    let populatedTeamData = team;
    configData.map(config => {
      populatedTeamData = {
        ...populatedTeamData,
        ...(isEmpty(populatedTeamData?.[config.slug]) ? 
          {[`${config.slug}`]: config.children}
          :
          {}
        )
      }
    })
    return populatedTeamData;
  }

  async createTeam(data: CreateTeamDto) {
    try {
      await this.teamOwnerExist(data.teamOwner);
      const ruleData = await this.ruleModel.findById(data.gameRules);
      const teamDataWithConfig = await this.populateStatsConfigDataIntoTeam(data);
      return await this.teamModel.create({...teamDataWithConfig, game_rules_setting: ruleData});
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

  async getDefaultSettingData(settingName: SettingNameEnumType, teamId: MongoIdType, penaltyOptionName: "technical"|"personal" = null) {
    let settingDefaultPayload;

    const configData: ConfigDataHierarchyType = await this.statsConfigService.findHierarchyBySlug(settingName);
  
    switch(settingName) {
      case SettingNameEnum.penalty_time_options:
        settingDefaultPayload = {penalty_time_options: configData.children}
        break;
      case SettingNameEnum.penalty_options:
        if(penaltyOptionName) {
          let {penalty_options} = await this.teamModel.findById(teamId).lean() as any;
          if(penalty_options) {
            const isOldConfig = penalty_options.find(opt => isEmpty(opt?.displayName));
            if(isOldConfig) {
              settingDefaultPayload = {penalty_options: configData.children}
            } else {
              const index = penalty_options.findIndex(opt => opt.displayName === penaltyOptionName);
              penalty_options[index] = configData.children.find(opt => opt.displayName === penaltyOptionName);
              settingDefaultPayload = {penalty_options};
            }
          } else {
            settingDefaultPayload = {penalty_options: configData.children}
          }
        } else {
          settingDefaultPayload = {penalty_options: configData.children}
        }
        break;
      case SettingNameEnum.stats_rating:
        settingDefaultPayload = {stats_rating: default_stats_rating}
        break;
      case SettingNameEnum.turnover_options:
        settingDefaultPayload = {turnover_options: configData.children}
        break;
      case SettingNameEnum.game_rules_setting:
        let {gameRules} = await this.teamModel.findById(teamId).lean().populate("gameRules");
        settingDefaultPayload = {game_rules_setting: gameRules};
        break;
    }

    return settingDefaultPayload;
  }

  async resetTeamSetting(settingName: SettingNameEnumType, teamId: MongoIdType, penaltyOptionName: "technical"|"personal" = null) {
    let settingDefaultPayload = await this.getDefaultSettingData(settingName, teamId, penaltyOptionName);
    return await this.teamModel.findByIdAndUpdate(teamId, settingDefaultPayload, {new: true})
  }
}
