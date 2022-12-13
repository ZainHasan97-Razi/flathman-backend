import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateColorDto } from './dto/create.color.dto';

@Injectable()
export class ColorService {
  constructor(
    @InjectModel('Color') private colorModel: Model<CreateColorDto>,
  ) {}

  async create(data: CreateColorDto) {
    try {
      const colorCodeExist = await this.colorModel.findOne({
        colorCode: data.colorCode,
      });
      if (colorCodeExist) {
        throw new ConflictException(`Color code already exist`);
      }
      const colorNameExist = await this.colorModel.findOne({
        colorName: data.colorName,
      });
      if (colorNameExist) {
        throw new ConflictException(`Color name already exist`);
      }
      const createdColor = await this.colorModel.create(data);
      if (createdColor) {
        return {
          message: `Color has been created successfully!`,
        };
      }
    } catch (e) {
      throw e;
    }
  }

  async findAll() {
    try {
      const response = await this.colorModel.find().exec();
      return response;
    } catch (e) {
      throw new NotFoundException(`Couldn't found any colors`);
    }
  }

  async delete(id: string) {
    try {
      const response = await this.colorModel.findByIdAndDelete(id);
      return {
        message: `Color has been deleted successfully!`,
      };
      //   console.log('resp at delete color', response);
    } catch (e) {
      throw new BadRequestException(`Failed to delete color`);
    }
  }
}
