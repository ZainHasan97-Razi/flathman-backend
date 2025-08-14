import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubscriptionDto } from '../dto/create.subscription.dto';
import { CreateSubscriptionTypeDto } from '../dto/create.subscriptiontype.dto';
import { UpdateSubscriptionTypeDto } from '../dto/update.subscriptiontype.dto';

@Injectable()
export class SubscriptionTypeService {
  constructor(
    @InjectModel('subscription-type')
    private subscriptionTypeModel: Model<CreateSubscriptionTypeDto>,
    @InjectModel('Subscription')
    private subscriptionModel: Model<CreateSubscriptionDto>,
  ) {}

  async findAll() {
    try {
      const response = await this.subscriptionTypeModel.find().exec();
      return response;
    } catch (e) {
      // throw new NotFoundException(`Couldn't found any subscription-type`);
      throw e;
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.subscriptionTypeModel.findById(id);
      if (!response) {
        throw new NotFoundException(`Couldn't found any subscription-type`);
      }
      return response;
    } catch (e) {
      // console.log(e);
      // throw new NotFoundException(`Failed to fetch subscription-type`);
      throw e;
    }
  }

  async findOneByName(name: string) {
    try {
      const response = await this.subscriptionTypeModel.findOne({subscriptionName: name});
      if (!response) {
        throw new NotFoundException(`Couldn't found any subscription-type`);
      }
      return response;
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string) {
    try {
      const allUserSubscriptions = await this.subscriptionModel.find({
        subscriptionType: id,
      });
      if (!allUserSubscriptions || allUserSubscriptions.length === 0) {
        throw new NotFoundException(`Couldn't found any user subsription`);
      }
      if (allUserSubscriptions.length > 0) {
        allUserSubscriptions.map(async (v) => {
          await this.subscriptionModel.findOneAndDelete(v._id);
        });
      }
      const response = await this.subscriptionTypeModel.findByIdAndDelete(id);
      if (!response) {
        throw new NotFoundException(`Couldn't delete any subscription-type`);
      }
      return `Subscription type deleted successfully!`;
    } catch (e) {
      console.log('Errrrrrrrrrrrrrrrrrrrr ', e);
      throw e;
    }
  }

  async create(data: CreateSubscriptionTypeDto) {
    // console.log('Coming here at CreateSubscriptionTypeDto =>>> ');
    try {
      await this.subscriptionNameIsUnique(data.subscriptionName);
      if (data.type === 'clock only' || data.type === 'clock with stats') {
        const response = await this.subscriptionTypeModel.create(data);
        return {
          message: `SubscriptionType has been created successfully!`,
        };
      } else {
        throw new BadRequestException(`"Type" is invalid in your request`);
      }
    } catch (e) {
      // console.log('Err CreateSubscriptionTypeDto => ', e);
      // throw new BadRequestException(e?.message || e);
      throw e;
    }
  }

  async update(data: UpdateSubscriptionTypeDto) {
    try {
      const subscriptionType =
        await this.subscriptionTypeModel.findByIdAndUpdate(
          {
            _id: data.subsciptionTypeId,
          },
          data,
        );
      if (!subscriptionType) {
        throw new NotFoundException(
          `Subscription type ${data.subscriptionName} doesn't exist`,
        );
      }
    } catch (e) {
      // throw new BadRequestException(`Request failed: Couldn't update team`);
      throw e;
    }
  }

  async findOneAndDelete(id: string) {
    try {
      const response = await this.subscriptionTypeModel.findByIdAndDelete(id);
      if (!response) {
        throw new NotFoundException(`Couldn't found any subscription-type`);
      }
      return response;
    } catch (e) {
      // console.log(e);
      // throw new NotFoundException(
      //   e?.message || `Failed to fetch subscription-type`,
      // );
      throw e;
    }
  }
  async subscriptionNameIsUnique(subName: string) {
    const response = await this.subscriptionTypeModel.findOne({
      subscriptionName: subName,
    });
    if (response) {
      throw new ConflictException(`subscription name already exist`);
    }
  }
  async provideEndTimeOfSubscription(
    subscriptionTypeId: string,
    startTime: number,
  ) {
    const result = await this.subscriptionTypeModel.findById(
      subscriptionTypeId,
    );
    const endTime = Number(startTime) + Number(result.durationDays) * 86400000; // 86400000 miliseconds in one day
    // console.log(endTime);
    return endTime;
  }
}
