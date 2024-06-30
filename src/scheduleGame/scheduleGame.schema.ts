import * as mongoose from 'mongoose';

export const ScheduleStatusEnum = {
  active: 'active',
  expired: 'expired',
  deleted: 'deleted',
} as const;
export type ScheduleStatusEnumType = keyof typeof ScheduleStatusEnum;

export const ScheduleGameSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    teamId: { type: mongoose.Types.ObjectId, required: true, ref: 'Team' },
    opponentTeam: { type: mongoose.Types.ObjectId, required: true, ref: 'OpponentTeam' },
    date: {type: String, required: true},
    time: {type: String, required: true},
    scheduleDateTime: { type: Number, required: true }, // in unix seconds
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    conference: { type: Boolean, required: true },
    status: {
      type: String,
      enum: Object.values(ScheduleStatusEnum),
      default: ScheduleStatusEnum.active,
    },
  },
  { timestamps: true },
);
