import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRuleDto } from './dto/create.rule.dto';
import { UpdateRuleDto } from './dto/update.rule.dto';
import { ConfigDataHierarchyType } from 'src/statsConfig/statsConfig.model';
import { StatsConfigService } from 'src/statsConfig/statsConfig.service';

@Injectable()
export class RuleService {
  constructor(
    @InjectModel('Rule') private ruleModel: Model<CreateRuleDto>,
    private readonly statsConfigService: StatsConfigService,
  ) {}

  /*
  * Populate stats config data into team data if
    teamData has no stats config data(null or empty) like 
    penalty_options, turnover_options, penalty_time_options
  */
  async populateStatsConfigDataIntoRule(rule: object) {
    const configData: ConfigDataHierarchyType[] = await this.statsConfigService.findAll();
    let populatedRuleData = rule;
    populatedRuleData = {
      ...populatedRuleData,
      penalty_options: configData.find(config => config.slug === 'penalty_options')?.children,
    }

    return populatedRuleData;
  }

  async findAll() {
    try {
      const response = await this.ruleModel.find().exec();
      return response;
    } catch (e) {
      // throw new NotFoundException(`Couldn't found any rules`);
      throw e;
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.ruleModel.findById(id);
      if (!response) {
        throw new NotFoundException(`Couldn't found any rule`);
      }
      return response;
    } catch (e) {
      // throw new InternalServerErrorException(e?.message || `Request failed`);
      throw e;
    }
  }

  async createRule(data: CreateRuleDto) {
    try {
      await this.ruleNameIsUnique(data.ruleName);
      await this.ruleNumberIsUnique(data.ruleId);
      const ruleDataWithConfig = await this.populateStatsConfigDataIntoRule(data);
      const createdRule = await this.ruleModel.create(ruleDataWithConfig);
      if (createdRule) {
        return {
          message: `Rule has been created successfully!`,
        };
      }
    } catch (e) {
      // console.log('Err createTeam => ', e);
      // throw new BadRequestException(e?.message);
      throw e;
    }
  }

  async updateRule(data: UpdateRuleDto) {
    try {
      const rule = await this.ruleModel.findOne({ _id: data.id });
      if (!rule) {
        throw new NotFoundException(`Rule ${data.ruleName} doesn't exist`);
      }
      const ruleDataWithConfig = await this.populateStatsConfigDataIntoRule(data);
      const updatedRule = await this.ruleModel.findOneAndUpdate(
        { _id: data.id },
        ruleDataWithConfig,
      );
      return { message: `Rule ${data.ruleName} has been updated` };
    } catch (e) {
      // throw new BadRequestException(e?.message | e, 'Failed to update rule');
      throw e;
    }
  }

  ruleNameIsUnique = async (rulename: string) => {
    const result = await this.ruleModel.findOne({ ruleName: rulename });
    if (result) {
      throw new ConflictException('Rule name already exist!');
    }
  };
  ruleNumberIsUnique = async (ruleId: string) => {
    const result = await this.ruleModel.findOne({ ruleId });
    if (result) {
      throw new ConflictException('Rule name already exist!');
    }
  };
}
