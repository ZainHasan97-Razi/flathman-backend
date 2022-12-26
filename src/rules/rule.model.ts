import * as mongoose from 'mongoose';

export const RuleSchema = new mongoose.Schema({
  ruleName: { type: String, required: true, default: '' },
  ruleId: { type: String, required: true },
  mercyRuleLimit: { type: String, required: true, default: null },
  gender: { type: String, required: true },
  gamePeriods: { type: Number, required: true },
  periodDuration: { type: Number, required: true },
  gapBetweenPeriods: { type: Number, required: true },
  gapBetweenHalves: { type: Number, required: true },
  timeoutsPerHalf: { type: Number, required: true },
  timeoutsInOvertimePeriod: { type: Number, required: true },
  maxOvertimePeriods: { type: Number, required: true },
  overtimePeriodDuration: { type: Number, required: true },
  goalDiffForRunningClock: { type: Number, required: true },
  maxPersonalFouls: { type: Number, required: true },
  maxFOViolationPerHalf: { type: Number, required: true },
});
