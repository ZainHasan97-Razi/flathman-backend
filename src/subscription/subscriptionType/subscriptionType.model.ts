import * as mongoose from 'mongoose';

export const SubscriptionTypeSchema = new mongoose.Schema(
  {
    subscriptionName: {
      type: String,
      required: true,
      unique: true,
    },
    cost: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    durationDays: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);
