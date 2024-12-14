import * as mongoose from 'mongoose';
import { default_penalty_options, PenaltyOptionSubSchema } from 'src/team/teams.model';

export const RuleTypeEnum = {
  sixes: 'sixes',
  field: 'field',
};
export type RuleTypeEnumType = keyof typeof RuleTypeEnum;


export const RuleSchema = new mongoose.Schema(
  {
    ruleName: { type: String, required: true, default: '' },
    ruleId: { type: String, required: true },
    mercyRuleLimit: { type: String, default: null },
    gender: { type: String, required: true },
    type: { type: String, required: true, enum: Object.values(RuleTypeEnum) },
    gamePeriods: { type: Number, required: true },
    periodDuration: { type: Number, required: true },
    gapBetweenPeriods: { type: Number, required: true },
    gapBetweenHalves: { type: Number, required: true },
    timeoutDuration: {type: Number, required: true, default: 0},
    timeoutsPerHalf: { type: Number, required: true },
    timeoutsInOvertimePeriod: { type: Number, required: true },
    maxOvertimePeriods: { type: Number, required: true },
    overtimePeriodDuration: { type: Number, required: true },
    goalDiffForRunningClock: { type: Number, default: null },
    maxPersonalFouls: { type: Number, required: true },
    maxFOViolationPerHalf: { type: Number, required: true },
    penalty_options: {
      type: [PenaltyOptionSubSchema],
      default: default_penalty_options,
    },
  },
  { timestamps: true },
);
