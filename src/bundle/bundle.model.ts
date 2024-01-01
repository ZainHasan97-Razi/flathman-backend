import * as mongoose from 'mongoose';
import {
  BundleStatusEnum,
  ClockTypesEnum,
  SubscriptionTypeEnum,
} from 'src/constants/enums';

const subSchemaFeatures = new mongoose.Schema(
  {
    slug: {
      type: String,
      enum: Object.values(ClockTypesEnum),
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
);

export const BundleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    features: [subSchemaFeatures],
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
      unique: true,
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
