import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRuleDto } from './dto/create.rule.dto';
import { UpdateRuleDto } from './dto/update.rule.dto';

@Injectable()
export class RuleService {
  constructor(@InjectModel('Rule') private ruleModel: Model<CreateRuleDto>) {}

  async findAll() {
    try {
      const response = await this.ruleModel.find().exec();
      return response;
    } catch (e) {
      throw new NotFoundException(`Couldn't found any rules`);
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
      throw new InternalServerErrorException(e?.message || `Request failed`);
    }
  }

  async createRule(data: CreateRuleDto) {
    try {
      await this.ruleNameIsUnique(data.ruleName);
      await this.ruleNumberIsUnique(data.ruleId);
      const createdRule = await this.ruleModel.create(data);
      if (createdRule) {
        return {
          message: `Rule has been created successfully!`,
        };
      }
    } catch (e) {
      // console.log('Err createTeam => ', e);
      throw new BadRequestException(e?.message);
    }
  }

  async updateRule(data: UpdateRuleDto) {
    try {
      const rule = await this.ruleModel.findOne({ _id: data.id });
      if (!rule) {
        throw new NotFoundException(`Rule ${data.ruleName} doesn't exist`);
      }
      const updatedRule = await this.ruleModel.findOneAndUpdate(
        { _id: data.id },
        data,
      );
      return { message: `Rule ${data.ruleName} has been updated` };
    } catch (e) {
      throw new BadRequestException(e?.message | e, 'Failed to update rule');
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
