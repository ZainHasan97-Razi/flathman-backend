import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { MongoIdType } from 'src/common/types/mongoid.type';
import { CreateBundleDto } from './dto/create.bundle.dto';
import { UpdateBundleDto } from './dto/update.bundle.dto';
import { BundleStatusEnum } from 'src/constants/enums';
@Injectable()
export class SubscriptionBundleService {
  constructor(
    // private subscriptionModel: Model<SubscriptionModelDto>,
    private bundleModel: Model<CreateBundleDto & UpdateBundleDto>,
  ) {}

  async create(body: CreateBundleDto) {
    try {
      return await this.bundleModel.create(body);
    } catch (e) {
      throw e;
    }
  }

  async update(id: MongoIdType, body: UpdateBundleDto) {
    try {
      return await this.bundleModel.findByIdAndUpdate(id, body);
    } catch (e) {
      throw e;
    }
  }

  async findByUserId(userId: MongoIdType) {
    try {
      return await this.bundleModel.find({
        status: BundleStatusEnum.in_active,
      });
    } catch (e) {
      throw e;
    }
  }

  async findAll() {
    try {
      return await this.bundleModel.find();
    } catch (e) {
      throw e;
    }
  }
}
