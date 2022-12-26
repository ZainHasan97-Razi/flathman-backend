import * as mongoose from 'mongoose';

export const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, default: '' },
  teamNickName: { type: String, required: true, default: '' },
  coachName: { type: String, required: true, default: '' },
  coachCell: { type: String, required: true, default: '' },
  coachEmail: { type: String, required: true, default: '' },
  teamOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  gameRules: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rule',
  },
});
