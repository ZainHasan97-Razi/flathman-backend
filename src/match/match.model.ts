import * as mongoose from 'mongoose';

export const MatchSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    teamA: { type: Object, required: true },
    teamB: { type: Object, required: true },
    general: { type: Object, required: true },
    rules: { type: Object, required: true },
    activityLog: { type: Array, required: true },
    gameStatus: {
      type: String,
      default: 'completed',
      enum: ['forfit', 'cancelled', 'completed'],
    },
  },
  { timestamps: true },
);
