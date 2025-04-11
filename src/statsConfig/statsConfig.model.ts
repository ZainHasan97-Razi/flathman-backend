import * as mongoose from 'mongoose';
import { MongoIdType } from 'src/common/common.types';

export type ConfigDataHierarchyType = {
  _id: MongoIdType;
  displayName: string;
  slug: string;
  value: string | number;
  description: string;
  parentId: MongoIdType | null;
  parentSlug: string | null;
  createdAt: string;
  updatedAt: string;
  children: Array<ConfigDataHierarchyType>;
};

export interface ConfigDataDocumentType extends mongoose.Document {
  _id: MongoIdType;
  displayName: string;
  slug: string;
  value: string | number;
  description: string;
  parentId: MongoIdType | null;
  parentSlug: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const StatsConfigSchema = new mongoose.Schema<ConfigDataDocumentType>(
  {
    displayName: { type: String, required: true },
    slug: { type: String, required: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    description: { type: String, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'StatsConfig' },
    parentSlug: { type: String, default: null },
  },
  { timestamps: true }
);

StatsConfigSchema.index({ displayName: 1, slug: 1, parentId: 1, parentSlug: 1 }, { unique: true });