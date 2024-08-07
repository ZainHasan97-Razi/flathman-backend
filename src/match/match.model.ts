import * as mongoose from 'mongoose';

export const GameResultEnum = {
  None: 'None',
  Won: 'Won',
  Lost: 'Lost',
  Tied: 'Tied',
};
export type GameResultEnumType = keyof typeof GameResultEnum;

// whenever an entry is added the matchStatus enum will either be scheduled or completed in default case
export const GameStatusEnum = {
  forfeit: 'forfeit',
  // suspended: 'suspended', // as per today 27-July-2024 this feature is not enabled yet 
  scheduled: 'scheduled',
  cancelled: 'cancelled',
  completed: 'completed',
} as const;
export type GameStatusEnumType = keyof typeof GameStatusEnum;

export const MatchSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, //common
    teamA: { type: Object }, // this is always user's licensed team
    teamB: { type: Object },
    general: { type: Object },
    rules: { type: Object },
    activityLog: { type: Array },
    gameStatus: {
      // In old mobile apk version gameStatus is set default to completed on server side
      type: String,
      enum: Object.values(GameStatusEnum),
    },
    gameResult: {
      type: String,
      enum: Object.values(GameResultEnum),
      default: GameResultEnum.None,
    },
    // For scheduled match options
    date: { type: String, default: null },
    time: { type: String, default: null },
    effectiveDateTime: { type: Number, default: null }, // in unix seconds
    homeTeam: { type: String, default: null }, //common
    awayTeam: { type: String, default: null }, //common
    conference: { type: Boolean, default: null },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);
