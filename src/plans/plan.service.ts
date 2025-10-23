import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plan, PlanDocument, PlanStatusEnum, PlanTypeEnum } from './plan.model';
import { CreatePlanDto } from './dto/create.plan.dto';
import { UpdatePlanDto } from './dto/update.plan.dto';
import { MongoIdType } from 'src/common/common.types';

@Injectable()
export class PlanService {
  constructor(
    @InjectModel('Plan') private planModel: Model<Plan>,
  ) { }
  
  getModel() {
    return this.planModel;
  }

  async create(body: CreatePlanDto) {
    try {
      const activePlans: PlanDocument[] = await this.planModel.find({ status: PlanStatusEnum.active });
      if (body.type === PlanTypeEnum.annual) {
        /*If annual plan then it's created as default drafted status, incase if we are creating it with active status 
        then we must put validation here to check that there are no simultaneous active annual plans*/
      } else {
        let hasOverlappingMonth = false;
        activePlans.forEach(plan => {
          const hasCommonMonth = plan.months.some(month => body.months.includes(month))
          if(hasCommonMonth) hasOverlappingMonth = true;
        });
        if (hasOverlappingMonth) {
          throw new BadRequestException('Overlapping month found');
        }
      }
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

      const activePlans: PlanDocument[] = await this.planModel.find({ status: PlanStatusEnum.active });
      if (plan.type === PlanTypeEnum.annual) {
        if (body.status && body.status === PlanStatusEnum.active) {
          if(activePlans.find(p => p.status === PlanStatusEnum.active)) throw new BadRequestException('Active annual plan already exists');
        }
      } else {
        if (body.months && body.months.length > 0) {
          let hasOverlappingMonth = false;
          activePlans.forEach(plan => {
            const hasCommonMonth = plan.months.some(month => body.months.includes(month))
            if(hasCommonMonth) hasOverlappingMonth = true;
          });
          if (hasOverlappingMonth) {
            throw new BadRequestException('Overlapping month found');
          }
        }
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
