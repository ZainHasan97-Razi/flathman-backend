import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStatsConfigDto } from './dto/create.statsConfig.dto';
import { UpdateStatsConfigDto } from './dto/update.statsConfig.dto';
import { MongoIdType } from 'src/common/common.types';
import { ConfigDataDocumentType, ConfigDataHierarchyType } from './statsConfig.model';

@Injectable()
export class StatsConfigService {
  constructor(@InjectModel('StatsConfig') private statsConfigModel: Model<CreateStatsConfigDto>) {}

  async create(data: CreateStatsConfigDto) {
    try {
      const response = await this.statsConfigModel.create(data);
      return response;
    } catch (e) {
      throw e;
    }
  }

  async update(id: MongoIdType, data: UpdateStatsConfigDto) {
    try {
      const response = await this.statsConfigModel.findByIdAndUpdate(id, data, { new: true });
      return response;
    } catch (e) {
      throw e;
    }
  }

  async delete(id: MongoIdType) {
    try {
      const childConfigs = await this.statsConfigModel.find({ parentId: id });
      const childConfigIds = childConfigs.map(config => config._id);
      await this.statsConfigModel.deleteMany({ _id: { $in: [...childConfigIds, id] } });
      return { message: 'Deleted successfully' };
    } catch (e) {
      throw e;
    }
  }

  buildHierarchy(docs: Array<ConfigDataDocumentType>, parentId = null) {
    return docs
      .filter(doc => 
        (parentId === null && doc.parentId === null) || 
        (doc.parentId && parentId && doc.parentId.toString() === parentId.toString())
      )
      .map(doc => ({
        ...doc,
        children: this.buildHierarchy(docs, doc._id)
      }));
  }

  async findAll(): Promise<ConfigDataHierarchyType[]> {
    try {
      const allConfigs: Array<ConfigDataDocumentType> = await this.statsConfigModel.find().lean();
      const hierarchicalData = this.buildHierarchy(allConfigs);
      return hierarchicalData;
    } catch (e) {
      throw e;
    }
  }

  async findBySlug(slug: string): Promise<ConfigDataHierarchyType | null> {
    try {
      const allConfigs: Array<ConfigDataDocumentType> = await this.statsConfigModel.find().lean();
      const hierarchicalData = this.buildHierarchy(allConfigs);
      const filteredConfig = hierarchicalData.find(config => config.slug === slug);
      return filteredConfig || null;
    } catch (e) {
      throw e;
    }
  }

  // async findAll() {
  //   try {
  //     const response = await this.ruleModel.find().exec();
  //     return response;
  //   } catch (e) {
  //     // throw new NotFoundException(`Couldn't found any rules`);
  //     throw e;
  //   }
  // }

  // async findOne(id: string) {
  //   try {
  //     const response = await this.ruleModel.findById(id);
  //     if (!response) {
  //       throw new NotFoundException(`Couldn't found any rule`);
  //     }
  //     return response;
  //   } catch (e) {
  //     // throw new InternalServerErrorException(e?.message || `Request failed`);
  //     throw e;
  //   }
  // }

  // async createRule(data: CreateRuleDto) {
  //   try {
  //     await this.ruleNameIsUnique(data.ruleName);
  //     await this.ruleNumberIsUnique(data.ruleId);
  //     const createdRule = await this.ruleModel.create(data);
  //     if (createdRule) {
  //       return {
  //         message: `Rule has been created successfully!`,
  //       };
  //     }
  //   } catch (e) {
  //     // console.log('Err createTeam => ', e);
  //     // throw new BadRequestException(e?.message);
  //     throw e;
  //   }
  // }

  // async updateRule(data: UpdateRuleDto) {
  //   try {
  //     const rule = await this.ruleModel.findOne({ _id: data.id });
  //     if (!rule) {
  //       throw new NotFoundException(`Rule ${data.ruleName} doesn't exist`);
  //     }
  //     const updatedRule = await this.ruleModel.findOneAndUpdate(
  //       { _id: data.id },
  //       data,
  //     );
  //     return { message: `Rule ${data.ruleName} has been updated` };
  //   } catch (e) {
  //     // throw new BadRequestException(e?.message | e, 'Failed to update rule');
  //     throw e;
  //   }
  // }

  // ruleNameIsUnique = async (rulename: string) => {
  //   const result = await this.ruleModel.findOne({ ruleName: rulename });
  //   if (result) {
  //     throw new ConflictException('Rule name already exist!');
  //   }
  // };
  // ruleNumberIsUnique = async (ruleId: string) => {
  //   const result = await this.ruleModel.findOne({ ruleId });
  //   if (result) {
  //     throw new ConflictException('Rule name already exist!');
  //   }
  // };
}
