import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { TEAM_SCHEMA_TYPE } from './team.model';
// import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plan } from './plan.model';
import { CreatePlanDto } from './dto/create.plan.dto';
import { UpdatePlanDto } from './dto/update.plan.dto';
import { MongoIdType } from 'src/common/common.types';
// import { CreatePlayerDto } from './dto/create.player.dto';
// import { UpdatePlayerDto } from './dto/update.player.dto';
// import { CreateTeamDto } from 'src/team/dto/create.team.dto';
// import { TeamService } from 'src/team/teams.services';

@Injectable()
export class PlanService {
  constructor(
    @InjectModel('Plan') private planModel: Model<Plan>,
  ) {}

  async create(body: CreatePlanDto) {
    try {
      return await this.planModel.create(body);
    } catch (e) {
      throw e;
    }
  }

  async findByIdAndupdate(_id: MongoIdType, body: UpdatePlanDto) {
    try {
      const plan = await this.planModel.findById(_id);
      if (!plan) {
        throw new NotFoundException('Plan not found');
      }
      Object.assign(plan, body);
      return await plan.save();
    } catch (e) {
      throw e;
    }
  }

//   async findAll() {
//     try {
//       const response = await this.playerModel.find().exec();
//       return response;
//     } catch (e) {
//       throw e;
//     }
//   }

//   async findOne(id: string) {
//     try {
//       const response = await this.playerModel.findById(id);
//       return response;
//     } catch (e) {
//       throw e;
//     }
//   }

//   async delete(id: string) {
//     try {
//       const response = await this.playerModel.findByIdAndDelete(id);
//       console.log('resp at delete player', response);
//     } catch (e) {
//       throw e;
//     }
//   }
}
