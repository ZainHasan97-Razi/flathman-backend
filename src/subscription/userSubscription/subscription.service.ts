import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubscriptionDto } from '../dto/create.subscription.dto';
import { CreateSubscriptionTypeDto } from '../dto/create.subscriptiontype.dto';
import {
  UpdateSubscriptionDto,
  UpdateSubscriptionOnEndGameDto,
  UpdateSubscriptionWhileGetDto,
} from '../dto/update.subscription.dto';
import { SubscriptionTypeService } from '../subscriptionType/subscriptionType.service';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel('Subscription')
    private subscriptionModel: Model<CreateSubscriptionDto>,
    // private subscriptionTypeModel: Model<CreateSubscriptionTypeDto>,
    private readonly subscriptionTypeService: SubscriptionTypeService,
  ) {}

  async getMySubscriptions(body: { userId: string }) {
    console.log('Coming hereeee');
    // console.log('Coming here to getMySubscriptions id => ', body);
    try {
      const response = await this.subscriptionModel
        .find({ userId: body.userId })
        .populate('subscriptionType');

      response.map(async (v, i) => {
        // CONDITION FOR NON-FREE TRIAL SUBSCRIPTION
        if (
          Date.now() > Number(v.endTime) &&
          v.isExpired === false &&
          v.subscriptionType.subscriptionName !== 'Free trial(Clock only)' &&
          v.subscriptionType.subscriptionName !== 'Free trial(Clock stats)'
        ) {
          const result = await this.updateWhileGet({
            subscriptionId: v._id,
            expired: 'yes',
          });
          // console.log(result, 'Subscription has been updated to expired!');
        }
        // CONDITION FOR FREE TRIAL SUBSCRIPTION
        if (
          (v.subscriptionType.subscriptionName === 'Free trial(Clock only)' ||
            v.subscriptionType.subscriptionName ===
              'Free trial(Clock stats)') &&
          v.timesUsed > 0
        ) {
          const result = await this.updateWhileGet({
            subscriptionId: v._id,
            expired: 'yes',
          });
        }
      });

      const data = await this.subscriptionModel
        .find({ userId: body.userId })
        .populate('subscriptionType');
      return data;
    } catch (e) {
      throw new BadRequestException(
        e?.message || 'Failed to fetch my subscriptions',
      );
    }
  }

  async findAll() {
    try {
      let response = await this.subscriptionModel
        .find()
        .populate('subscriptionType');

      response.map(async (v, i) => {
        if (
          Date.now() > Number(v.endTime) &&
          v.isExpired === false &&
          v.subscriptionType.subscriptionName !== 'Free trial(Clock only)' &&
          v.subscriptionType.subscriptionName !== 'Free trial(Clock stats)'
        ) {
          const result = await this.updateWhileGet({
            subscriptionId: v._id,
            expired: 'yes',
          });
          // console.log(result, 'Subscription has been updated to expired!');
        }

        // Updating Free trial subscription
        if (
          (v.subscriptionType.subscriptionName === 'Free trial(Clock only)' ||
            v.subscriptionType.subscriptionName ===
              'Free trial(Clock stats)') &&
          v.timesUsed > 0
        ) {
          const result = await this.updateWhileGet({
            subscriptionId: v._id,
            expired: 'yes',
          });
        }
      });
      response = await this.subscriptionModel
        .find()
        .populate('subscriptionType');
      return response;
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: string) {
    try {
      let result = await this.subscriptionModel
        .findById(id)
        .populate('subscriptionType');
      // This condition checks while getting Data that if endTime is exceed from currentTime then it updates
      let isUpdated = false;
      if (
        Date.now() > Number(result.endTime) &&
        result.isExpired === false &&
        result.subscriptionType.subscriptionName !== 'Free trial(Clock only)' &&
        result.subscriptionType.subscriptionName !== 'Free trial(Clock stats)'
      ) {
        await this.updateWhileGet({
          subscriptionId: id,
          expired: 'yes',
        });
        // console.log(result, 'Subscription has been updated to expired!');
        isUpdated = true;
      }
      if (
        (result.subscriptionType.subscriptionName ===
          'Free trial(Clock only)' ||
          result.subscriptionType.subscriptionName ===
            'Free trial(Clock stats)') &&
        result.timesUsed > 0
      ) {
        await this.updateWhileGet({
          subscriptionId: id,
          expired: 'yes',
        });
        isUpdated = true;
      }
      if (!result) {
        throw new NotFoundException(`Couldn't found any subscription`);
      }
      if (isUpdated) {
        result = await (
          await this.subscriptionModel.findById(id)
        ).populate('subscriptionType');
      }
      return result;
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }

  async create(data: CreateSubscriptionDto) {
    try {
      let newData = data;
      const endTime =
        await this.subscriptionTypeService.provideEndTimeOfSubscription(
          data.subscriptionType,
          data.startTime,
        );
      newData.endTime = endTime;
      const subscription = await this.subscriptionModel.create(newData);
      return {
        message: `Subscription has been added successfully!`,
      };
    } catch (e) {
      // console.log('Err createTeam => ', e);
      throw new BadRequestException(e?.message || e);
    }
  }

  async update(data: UpdateSubscriptionDto) {
    try {
      let newData = data;
      const endTime =
        await this.subscriptionTypeService.provideEndTimeOfSubscription(
          data.subscriptionType,
          data.startTime,
        );
      newData.endTime = endTime;
      const subscription = await this.subscriptionModel.findOneAndUpdate(
        {
          _id: data.subscriptionId,
        },
        newData,
      );
      if (!subscription) {
        throw new NotFoundException(`Subscription doesn't exist`);
      }
    } catch (e) {
      throw e;
    }
  }

  async updateWhileGet(data: UpdateSubscriptionWhileGetDto) {
    console.log('updateWhileGet');
    try {
      const subscription = await this.subscriptionModel
        .findById(data.subscriptionId)
        .populate('subscriptionType');
      if (!subscription) {
        throw new NotFoundException(`Subscription on end game doesn't exist`);
      }

      await this.subscriptionModel.findOneAndUpdate(
        {
          _id: data.subscriptionId,
        },
        data.expired
          ? {
              isExpired: data.expired === 'yes' ? true : false,
            }
          : data,
      );
      if (!subscription) {
        throw new NotFoundException(`Subscription doesn't exist`);
      }
    } catch (e) {
      throw e;
    }
  }

  async updateTimesUsedOnGameEnd(data: UpdateSubscriptionOnEndGameDto) {
    try {
      const subscription = await this.subscriptionModel.findById(data._id);
      if (!subscription) {
        throw new NotFoundException(`Subscription on end game doesn't exist`);
      }
      await this.subscriptionModel.findOneAndUpdate(
        {
          _id: data._id,
        },
        {
          timesUsed: Number(subscription.timesUsed) + 1,
        },
      );
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string) {
    try {
      const response = await this.subscriptionModel.findByIdAndDelete(id);
      if (!response) {
        throw new NotFoundException(`Couldn't delete subscription`);
      }
      return response;
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }

  // async provideEndTimeOfSubscription(
  //   subscriptionTypeId: string,
  //   startTime: number,
  // ) {
  //   const result = await this.subscriptionTypeModel.findById(
  //     subscriptionTypeId,
  //   );
  //   const endTime = startTime + Number(result.durationDays) * 86400000; // 86400000 miliseconds in one day
  //   // console.log(endTime);
  //   return endTime;
  // }
}
