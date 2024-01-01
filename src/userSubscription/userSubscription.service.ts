import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { CreateUserSubscriptionDto } from './dto/create.user-subscription.dto';
import { UpdateUserSubscriptionDto } from './dto/update.user-subscription.dto';
import { MongoIdType } from 'src/common/types/mongoid.type';
import {
  SubscriptionStatusEnum,
  SubscriptionTypeEnum,
} from 'src/constants/enums';
import { BundleService } from 'src/bundle/bundle.service';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
@Injectable()
export class UserSubscriptionService {
  constructor(
    @InjectModel('user-subscription')
    private userSubscriptionModel: Model<
      CreateUserSubscriptionDto & UpdateUserSubscriptionDto
    >,
    @InjectModel('User')
    private userModel: Model<CreateUserDto>,
    private readonly bundleService: BundleService,
  ) {}

  async create(body: CreateUserSubscriptionDto) {
    try {
      const user = await this.userModel.findById(body.userId);
      if (!user) {
        throw new BadRequestException(`Invalid user id!`);
      }
      const bundle = await this.bundleService.findOne(body.bundle);
      if (!bundle) {
        throw new BadRequestException(`Invalid bundle id!`);
      }
      if (bundle.type === SubscriptionTypeEnum.free_trial) {
        const freeTrialSubscriptionExist =
          await this.userSubscriptionModel.findOne({
            userId: body.userId,
            type: SubscriptionTypeEnum.free_trial,
          });
        if (freeTrialSubscriptionExist) {
          throw new BadRequestException('Free trial is already used!');
        }
      }
      const payload = {
        ...body,
        numberOfUsage: bundle.numberOfUsage,
        type: bundle.type,
      };
      return await this.userSubscriptionModel.create(payload);
    } catch (e) {
      throw e;
    }
  }

  async update(id: MongoIdType, body: UpdateUserSubscriptionDto) {
    try {
      return await this.userSubscriptionModel.findByIdAndUpdate(id, body, {
        new: true,
      });
    } catch (e) {
      throw e;
    }
  }

  async findUserAvailableSubscriptionCount(userId: MongoIdType) {
    try {
      const response = await this.userSubscriptionModel.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            status: SubscriptionStatusEnum.active,
            $expr: {
              $lt: ['$timesUsed', '$numberOfUsage'],
            },
          },
        },
        {
          $group: {
            _id: null,
            totalCounts: {
              $sum: { $subtract: ['$numberOfUsage', '$timesUsed'] },
            },
          },
        },
      ]);

      // Access the sum of counts from the response
      const sumOfCounts = response.length > 0 ? response[0].totalCounts : 0;
      return { availableSubscriptions: sumOfCounts };
    } catch (e) {
      throw e;
    }
  }

  // not tested
  async findUserAvailableSubscriptionWithAssignedTeams(userId: MongoIdType) {
    try {
      return await this.userSubscriptionModel
        .find({
          userId,
          teamId: { $ne: null },
          status: SubscriptionStatusEnum.active,
          timesUsed: { $lt: '$numberOfUsage' },
        })
        .lean();
    } catch (e) {
      throw e;
    }
  }

  // not tested
  async findUserAvailableSubscriptionWithoutAssignedTeams(userId: MongoIdType) {
    try {
      return await this.userSubscriptionModel
        .find({
          userId,
          teamId: null,
          status: SubscriptionStatusEnum.active,
          timesUsed: { $lt: '$numberOfUsage' },
        })
        .lean();
    } catch (e) {
      throw e;
    }
  }
}
