import * as mongoose from 'mongoose';

export const AppVersionSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true, enum: ['android', 'ios'] },
    version: { type: String, required: true },
    deletedAt: { type: Date, default: null },
    updateType: { type: String, required: true, enum: ['force'] },
  },
  { timestamps: true },
);
