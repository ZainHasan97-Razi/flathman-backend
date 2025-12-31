import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { PlanSchema } from './plan.model';
// import { PlanController } from './plan.controller';
// import { PlanService } from './plan.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      // { name: 'Plan', schema: PlanSchema },
    ]),
  ],
  // controllers: [PlanController],
  // providers: [PlanService],
})
export class PlanPurchaseModule {}
