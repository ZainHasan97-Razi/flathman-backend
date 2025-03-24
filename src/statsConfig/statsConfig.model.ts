import * as mongoose from 'mongoose';

export const StatsConfigSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    parentId: { type: mongoose.Types.ObjectId, default: null },
    parentSlug: { type: String, default: null },
  },
  { timestamps: true },
);