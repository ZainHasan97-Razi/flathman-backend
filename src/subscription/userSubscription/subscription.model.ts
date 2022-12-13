import * as mongoose from 'mongoose';

export const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    default: null,
  },
  isExpired: {
    type: Boolean,
    default: false,
  },
  subscriptionType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subscription-type',
    required: true,
  },
  startTime: {
    type: Number,
    default: 0,
    // required: true,
  },
  endTime: {
    type: Number,
    default: 0,
    // required: true,
  },
  timesAllowed: {
    type: Number,
    required: true,
    default: 0,
  },
  timesUsed: {
    type: Number,
    default: 0,
  },
});
