import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
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
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  deviceTokens: {
    type: Array,
    required: true,
  },
  // subscriptions: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Subscription',
  //   },
  // ],
  // licensedTeams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  // matchLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
});

// export interface USER_SCHEMA_TYPE {
//   userName: string;
//   isAdmin: boolean;
//   email: string;
//   password: string;
// }
