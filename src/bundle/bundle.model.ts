import * as mongoose from 'mongoose';
import { BundleStatusEnum, SubscriptionTypeEnum } from 'src/constants/enums';

export const BundleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    features: {
      type: Array,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    priceUnit: {
      type: String,
      required: true,
    },
    androidProductId: {
      type: String,
      required: false,
    },
    iosProductId: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(SubscriptionTypeEnum),
    },
    status: {
      type: String,
      default: BundleStatusEnum.in_active,
      enum: Object.values(BundleStatusEnum),
    },
    displayOrder: {
      type: Number,
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
      default: null,
    },
  },
  { timestamps: true },
);
