import * as mongoose from 'mongoose';

export const StatsConfigSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true},
    description: { type: String, required: true },
    parentId: { type: mongoose.Types.ObjectId, default: null },
    parentSlug: { type: String, default: null },
  },
  { timestamps: true },
);

StatsConfigSchema.index({ name: 1, slug: 1, parentId: 1, parentSlug: 1 }, { unique: true });