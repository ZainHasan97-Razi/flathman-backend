import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const PlanStatusEnum = {
  drafted: "drafted",
  active: "active",
  deleted: "deleted",
} as const;
export type PlanStatusEnumType = keyof typeof PlanStatusEnum;

export const PlanTypeEnum = {
  annual: "annual",
  monthly: "monthly",
} as const;
export type PlanTypeEnumType = keyof typeof PlanTypeEnum;

@Schema({timestamps: true})
export class Plan {
  @Prop({type: String, required: true})
  displayName: string;

  @Prop({type: String, required: true})
  description: string;

  @Prop({type: String, enum: PlanTypeEnum, required: true})
  type: PlanTypeEnumType;

  @Prop({type: String, enum: PlanStatusEnum, default: PlanStatusEnum.drafted})
  status: PlanStatusEnumType;

  @Prop({type: Number, required: true})
  costUsd: number;

  @Prop({type: [Number]}) // ONly for monthly packages where there can be no overlapping month
  months: number;
}

export type PlanDocument = Plan & Document;

export const PlanSchema = SchemaFactory.createForClass(Plan);