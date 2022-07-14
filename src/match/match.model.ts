import * as mongoose from 'mongoose';

export const MatchSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    winnerTeam: { type: Object, required: true },
    otherTeam: { type: Object, required: true },
    general: { type: Object, required: true },
    rules: { type: Object, required: true },
    activityLog: { type: Array, required: true },
    isSuspended: { type: Boolean, default: false },
  },
  {
    // WILL CREATE TIME STAMPS (CREATED AT & MODIFIED AT)
    timestamps: true,
  },
);
