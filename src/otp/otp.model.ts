import * as mongoose from 'mongoose';
import { OtpTypeEnum } from 'src/constants/enums';
import { Schema, model, Document } from 'mongoose';

export interface Otp extends Document {
  user: mongoose.Types.ObjectId;
  email: string;
  type: OtpTypeEnum;
  code: string;
  expiry: number;
  isUsed?: boolean;
}

export const OtpSchema = new Schema<Otp>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    email: { type: String, required: true },
    type: { type: String, required: true, enum: Object.values(OtpTypeEnum) },
    code: { type: String, required: true },
    expiry: { type: Number, required: true },
    isUsed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export default model<Otp>('Otp', OtpSchema);
