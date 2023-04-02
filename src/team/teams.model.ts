import * as mongoose from 'mongoose';

export const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, default: '' },
  teamNickName: { type: String, default: null },
  coachName: { type: String, default: null },
  coachCell: { type: String, default: null },
  coachEmail: { type: String, default: null },
  teamOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  gameRules: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rule',
    required: true,
  },
});
