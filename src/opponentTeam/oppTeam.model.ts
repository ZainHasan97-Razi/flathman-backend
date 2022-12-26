import * as mongoose from 'mongoose';

export const OpponentTeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, default: '' },
  teamNickName: { type: String, required: true, default: '' },
  coachName: { type: String, required: true, default: '' },
  coachCell: { type: String, required: true, default: '' },
  coachEmail: { type: String, required: true, default: '' },
  isConference: { type: Boolean, required: true, default: false },
  teamOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
