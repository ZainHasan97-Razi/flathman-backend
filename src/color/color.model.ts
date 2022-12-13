import * as mongoose from 'mongoose';

export const ColorSchema = new mongoose.Schema({
  colorName: { type: String, required: true },
  colorCode: { type: String, required: true },
});
