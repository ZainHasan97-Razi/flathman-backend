import * as mongoose from 'mongoose';

export const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  isExpired: {
    type: Boolean,
  },
  subscriptionType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subscription-type',
    required: true,
  },
  startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },
  timesUsed: {
    type: Number,
    required: true,
    default: 0,
  },
});
