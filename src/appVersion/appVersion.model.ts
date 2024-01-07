import * as mongoose from 'mongoose';
import { PlatformEnum } from 'src/constants/enums';

export const AppVersionSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      enum: Object.values(PlatformEnum),
    },
    version: { type: String, required: true },
    deletedAt: { type: Date, default: null },
    updateType: { type: String, required: true, enum: ['force'] },
  },
  { timestamps: true },
);
