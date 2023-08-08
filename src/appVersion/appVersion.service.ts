import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAppVersionDto } from './dto/create.appversion.dto';
import { platform } from 'os';

@Injectable()
export class AppVersionService {
  constructor(
    @InjectModel('AppVersion')
    private readonly appVersionModel: Model<CreateAppVersionDto>,
  ) {}

  async create(body: CreateAppVersionDto) {
    try {
      const versionAlreadyExist = await this.appVersionModel.findOne({
        version: body.version,
      });
      if (versionAlreadyExist) {
        if (versionAlreadyExist.deletedAt)
          throw new BadRequestException(
            'App version exist already in deleted log versions!',
          );
        else throw new BadRequestException('Version already exist');
      }
      return await this.appVersionModel.create(body);
    } catch (e) {
      throw e;
    }
  }

  async findCurrentVersion(body: { platform: string }) {
    try {
      if (body.platform !== 'android' && body.platform !== 'ios') {
        throw new BadRequestException('Invalid platform request!');
      }
      const response = await this.appVersionModel
        .find({ platform: body.platform, deletedAt: null })
        .sort({ _id: -1 });
      if (response.length > 0) return response[0];
      else return response;
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string) {
    try {
      await this.appVersionModel.findByIdAndUpdate(id, {
        deletedAt: new Date(),
      });
      return { id, msg: 'Version deleted successfully!' };
    } catch (e) {
      throw e;
    }
  }
}
