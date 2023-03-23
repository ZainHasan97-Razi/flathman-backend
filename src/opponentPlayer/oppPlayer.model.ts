import * as mongoose from 'mongoose';

export const OpponentPlayerSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, required: true },
  playerName: { type: String, required: true },
  isCaptain: { type: String, default: false },
  position: { type: String },
  playerNumber: { type: String, required: true },
});
