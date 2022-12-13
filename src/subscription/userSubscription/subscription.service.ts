import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubscriptionDto } from '../dto/create.subscription.dto';
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

  async getMyAllSubscription(body: { userId: string }) {
    try {
      const response = await this.subscriptionModel
        .find({ userId: body.userId })
        .populate('subscriptionType');

      response.map(async (v, i) => {
        // CONDITION FOR NON-FREE TRIAL & TIMES ALLOWED SUBSCRIPTION
        // console.log('data', v);

        if (
          Date.now() > Number(v.endTime) &&
          v.isExpired === false &&
          v.subscriptionType?.subscriptionName !== 'Free trial(Clock only)' &&
          v.subscriptionType?.subscriptionName !== 'Free trial(Clock stats)' &&
          v.subscriptionType?.subscriptionName !== 'times allowed(only)' &&
          v.subscriptionType?.subscriptionName !== 'times allowed(stats)'
        ) {
          const result = await this.updateWhileGet({
            subscriptionId: v._id,
            expired: 'yes',
          });
        }
        // CONDITION FOR FREE TRIAL SUBSCRIPTION
        if (
          (v.subscriptionType?.subscriptionName === 'Free trial(Clock only)' ||
            v.subscriptionType?.subscriptionName ===
              'Free trial(Clock stats)') &&
          v.timesUsed > 0
        ) {
          const result = await this.updateWhileGet({
            subscriptionId: v._id,
            expired: 'yes',
          });
        }
        // CONDITION NUMBER OF TIMES USAGE ALLOWED
        if (
          (v.subscriptionType?.subscriptionName === 'times allowed(clock)' ||
            v.subscriptionType?.subscriptionName === 'times allowed(stats)') &&
          v.timesUsed >= v.timesAllowed
        ) {
          const result = await this.updateWhileGet({
            subscriptionId: v._id,
            expired: 'yes',
          });
        }
      });

      const data = await this.subscriptionModel
        .find({ userId: body.userId })
        .populate('subscriptionType teamId');
      return data;
    } catch (e) {
      throw e;
    }
  }

  async getMySubscriptions(body: { userId: string }) {
    try {
      const response = await this.subscriptionModel
        .find({ userId: body.userId })
        .populate('subscriptionType');

      response.map(async (v, i) => {
        // CONDITION FOR NON-FREE TRIAL & TIMES ALLOWED SUBSCRIPTION
        // console.log('data', v);

        if (
          Date.now() > Number(v.endTime) &&
          v.isExpired === false &&
          v.subscriptionType?.subscriptionName !== 'Free trial(Clock only)' &&
          v.subscriptionType?.subscriptionName !== 'Free trial(Clock stats)' &&
          v.subscriptionType?.subscriptionName !== 'times allowed(only)' &&
          v.subscriptionType?.subscriptionName !== 'times allowed(stats)'
        ) {
          const result = await this.updateWhileGet({
            subscriptionId: v._id,
            expired: 'yes',
          });
        }
        // CONDITION FOR FREE TRIAL SUBSCRIPTION
        if (
          (v.subscriptionType?.subscriptionName === 'Free trial(Clock only)' ||
            v.subscriptionType?.subscriptionName ===
              'Free trial(Clock stats)') &&
          v.timesUsed > 0
        ) {
          const result = await this.updateWhileGet({
            subscriptionId: v._id,
            expired: 'yes',
          });
        }
        // CONDITION NUMBER OF TIMES USAGE ALLOWED
        if (
          (v.subscriptionType?.subscriptionName === 'times allowed(clock)' ||
            v.subscriptionType?.subscriptionName === 'times allowed(stats)') &&
          v.timesUsed >= v.timesAllowed
        ) {
          const result = await this.updateWhileGet({
            subscriptionId: v._id,
            expired: 'yes',
          });
        }
      });

      const data = await this.subscriptionModel
        .find({ userId: body.userId, isExpired: false, teamId: null })
        .populate('subscriptionType teamId');
      return data;
    } catch (e) {
      throw e;
    }
  }

  // async findAll() {
  //   try {
  //     let response = await this.subscriptionModel
  //       .find()
  //       .populate('subscriptionType');

  //     response.map(async (v, i) => {
  //       if (
  //         Date.now() > Number(v.endTime) &&
  //         v.isExpired === false &&
  //         v.subscriptionType.subscriptionName !== 'Free trial(Clock only)' &&
  //         v.subscriptionType.subscriptionName !== 'Free trial(Clock stats)'
  //       ) {
  //         const result = await this.updateWhileGet({
  //           subscriptionId: v._id,
  //           expired: 'yes',
  //         });
  //         // console.log(result, 'Subscription has been updated to expired!');
  //       }

  //       // Updating Free trial subscription
  //       if (
  //         (v.subscriptionType.subscriptionName === 'Free trial(Clock only)' ||
  //           v.subscriptionType.subscriptionName ===
  //             'Free trial(Clock stats)') &&
  //         v.timesUsed > 0
  //       ) {
  //         const result = await this.updateWhileGet({
  //           subscriptionId: v._id,
  //           expired: 'yes',
  //         });
  //       }
  //     });
  //     response = await this.subscriptionModel
  //       .find()
  //       .populate('subscriptionType');
  //     return response;
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  async findOne(id: string) {
    try {
      let d = await this.subscriptionModel
        .findById(id)
        .populate('teamId subscriptionType');

      // This condition checks while getting Data that if endTime is exceed from currentTime then it updates
      let isUpdated = false;
      if (
        Date.now() > Number(d.endTime) &&
        d.isExpired === false &&
        d.subscriptionType.subscriptionName !== 'Free trial(Clock only)' &&
        d.subscriptionType.subscriptionName !== 'Free trial(Clock stats)' &&
        d.subscriptionType.subscriptionName !== 'times allowed(only)' &&
        d.subscriptionType.subscriptionName !== 'times allowed(stats)'
      ) {
        // console.log('ordinary subscriptn');
        await this.updateWhileGet({
          subscriptionId: id,
          expired: 'yes',
        });
        isUpdated = true;
      }
      if (
        (d.subscriptionType.subscriptionName === 'Free trial(Clock only)' ||
          d.subscriptionType.subscriptionName === 'Free trial(Clock stats)') &&
        d.timesUsed > 0
      ) {
        // console.log('free trial subscriptn');
        await this.updateWhileGet({
          subscriptionId: id,
          expired: 'yes',
        });
        isUpdated = true;
      }
      //usage times allowed
      if (
        (d.subscriptionType.subscriptionName === 'times allowed(clock)' ||
          d.subscriptionType.subscriptionName === 'times allowed(stats)') &&
        d.timesUsed >= d.timesAllowed
      ) {
        const result = await this.updateWhileGet({
          subscriptionId: d._id,
          expired: 'yes',
        });
      }

      if (isUpdated) {
        d = await (
          await this.subscriptionModel.findById(id)
        ).populate('teamId subscriptionType');
      }
      return d;
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }

  async create(data: CreateSubscriptionDto) {
    try {
      const subsType = await this.subscriptionTypeService.findOne(
        data.subscriptionType,
      );
      if (!subsType) {
        throw new NotFoundException(`Subscription type doesn't exist`);
      }
      if (
        subsType.subscriptionName === 'times allowed(only)' ||
        subsType.subscriptionName === 'times allowed(stats)'
      ) {
        if (data.timesAllowed < 1) {
          throw new BadRequestException(
            `timesAllowed should be greater than zero in this subscription!`,
          );
        } else {
          const subscription = await this.subscriptionModel.create(data);
          return {
            message: `Subscription has been added successfully!`,
          };
        }
      } else {
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
      }
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
    // console.log('updateWhileGet');
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

  async assignTeamASubscription(data: {
    teamId: string;
    subscriptionId: string;
  }) {
    if (!data.teamId || data.teamId.length < 1) {
      throw new NotFoundException(`Team id is invalid`);
    }
    const subscription = await this.subscriptionModel.findById(
      data.subscriptionId,
    );
    if (!subscription) {
      throw new NotFoundException(`Failed to find subsciption`);
    }
    if (subscription && subscription.isExpired) {
      throw new BadRequestException(
        'Subscription is expired, please get subsctiption first',
      );
    }
    const prevTeamSubscription = await this.subscriptionModel.findOne({
      teamId: data.teamId,
    });
    if (prevTeamSubscription) {
      await this.subscriptionModel.findByIdAndUpdate(prevTeamSubscription._id, {
        teamId: null,
      });
    }
    // ASSIGN A TEAM_ID TO A SUSBSCIPTION
    await this.subscriptionModel.findByIdAndUpdate(data.subscriptionId, {
      teamId: data.teamId,
    });
    try {
    } catch (e) {
      console.log('Err at assignTeamASubscription', e);
      throw e;
    }
  }
}
