import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      // unique: true,
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
    organizationName: {
      type: String,
      default: null,
    },
    deviceTokens: {
      type: Array,
      default: [],
      // required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);
