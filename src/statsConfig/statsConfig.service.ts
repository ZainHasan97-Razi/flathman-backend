import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStatsConfigDto } from './dto/create.statsConfig.dto';
import { UpdateStatsConfigDto } from './dto/update.statsConfig.dto';
import { MongoIdType } from 'src/common/common.types';
import { ConfigDataDocumentType, ConfigDataHierarchyType } from './statsConfig.model';
import { RuleService } from 'src/rules/rule.service';
import { SettingNameEnum } from 'src/team/teams.model';

@Injectable()
export class StatsConfigService {
  constructor(
    @InjectModel('StatsConfig') private statsConfigModel: Model<CreateStatsConfigDto>,
    @Inject(forwardRef(() => RuleService)) private readonly ruleService: RuleService,
  ) {}

  async updateConfigInRules() {
    const config = await this.findHierarchyBySlug(SettingNameEnum.penalty_options)
    await this.ruleService.updateStatsConfigInRules({penalty_options: config.children})
  }

  async create(data: CreateStatsConfigDto) {
    try {
      const response = await this.statsConfigModel.create(data);
      await this.updateConfigInRules()
      return response;
    } catch (e) {
      throw e;
    }
  }

  async update(id: MongoIdType, data: UpdateStatsConfigDto) {
    try {
      const response = await this.statsConfigModel.findByIdAndUpdate(id, data, { new: true });
      await this.updateConfigInRules()
      return response;
    } catch (e) {
      throw e;
    }
  }

  async delete(id: MongoIdType) {
    try {
      const allNestedChildIds = await this.extractAllDeepNestedChildrenIds(id);
      await this.statsConfigModel.deleteMany({ _id: { $in: [...allNestedChildIds, id] } });
      await this.updateConfigInRules()
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

  async extractAllDeepNestedChildrenIds(parentId: MongoIdType): Promise<string[]> {
    const allConfigs: Array<ConfigDataDocumentType> = await this.statsConfigModel.find().lean();
    const hierarchicalData = this.buildHierarchy(allConfigs);
    const filteredConfig = hierarchicalData.find(config => config._id.toString() === parentId.toString());
    
    const allNestedChildrenIds = this.nestedIdsExtractor(filteredConfig);
    return allNestedChildrenIds;
  }

  nestedIdsExtractor(obj: ConfigDataHierarchyType, ids=[]): string[] {
    if (obj._id) {
      ids.push(obj._id);
    }
    
    if (obj.children && Array.isArray(obj.children)) {
      for (const child of obj.children) {
        this.nestedIdsExtractor(child, ids);
      }
    }
    
    return ids;
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

  async findHierarchyBySlug(slug: string): Promise<ConfigDataHierarchyType | null> {
    try {
      const allConfigs: Array<ConfigDataDocumentType> = await this.statsConfigModel.find().lean();
      const hierarchicalData = this.buildHierarchy(allConfigs);
      const filteredConfig = hierarchicalData.find(config => config.slug === slug);
      return filteredConfig || null;
    } catch (e) {
      throw e;
    }
  }

  async findHierarchyById(parentId: MongoIdType): Promise<ConfigDataHierarchyType | null> {
    try {
      const allConfigs: Array<ConfigDataDocumentType> = await this.statsConfigModel.find().lean();
      const hierarchicalData = this.buildHierarchy(allConfigs);
      const filteredConfig = hierarchicalData.find(config => config._id.toString() === parentId.toString());
      return filteredConfig || null;
    } catch (e) {
      throw e;
    }
  }
}
