import * as mongoose from 'mongoose';
import {
  PlatformEnum,
  SubscriptionStatusEnum,
  SubscriptionTypeEnum,
} from 'src/constants/enums';

export const UserSubscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: SubscriptionStatusEnum.active,
      enum: Object.values(SubscriptionStatusEnum),
    },
    platform: {
      type: String,
      enum: Object.values(PlatformEnum),
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(SubscriptionTypeEnum),
    },
    bundle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bundle',
      required: true,
    },
    startTime: {
      type: Number,
      default: null, // agr expiry nhi ha jesa times of usage wali subscription ma
    },
    endTime: {
      type: Number,
      default: null, // agr expiry nhi ha jesa times of usage wali subscription ma
    },
    numberOfUsage: {
      type: Number,
      required: true,
      default: 0,
    },
    timesUsed: {
      type: Number,
      default: 0,
    },
    recipt: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true },
);
