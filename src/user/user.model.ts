import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
    },
    email: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    deviceTokens: {
      type: Array,
      default: [],
      // required: true,
    },
  },
  { timestamps: true },
);
