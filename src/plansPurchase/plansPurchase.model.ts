import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MongoIdType } from 'src/common/common.types';
import { PlanTypeEnum, PlanTypeEnumType } from 'src/plans/plan.model';

export const PlanPurchaseStatusEnum = {
  pending: "pending",
  active: "active",
  expired: "expired",
} as const;
export type PlanPurchaseStatusEnumType = keyof typeof PlanPurchaseStatusEnum;

@Schema({timestamps: true})
export class PlanPurchase {
  @Prop({type: mongoose.Types.ObjectId, required: true, ref: "Plan"})
  plan: MongoIdType;

  @Prop({type: String, enum: PlanTypeEnum, required: true})
  planType: PlanTypeEnumType;

  @Prop({type: mongoose.Types.ObjectId, required: true, ref: "User"})
  user: MongoIdType;

  @Prop({type: Number, required: true})
  start: number;

  @Prop({type: Number, required: true})
  end: number;

  @Prop({type: String, enum: PlanPurchaseStatusEnum, default: PlanPurchaseStatusEnum.pending})
  status: PlanPurchaseStatusEnumType;
}

export type PlanPurchaseDocument = PlanPurchase & Document;

export const PlanPurchaseSchema = SchemaFactory.createForClass(PlanPurchase);