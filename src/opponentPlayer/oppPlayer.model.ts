import * as mongoose from 'mongoose';

export const OpponentPlayerSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, required: true },
  playerName: { type: String, required: true },
  isCaptain: { type: String, required: true, default: false },
  position: { type: String, required: true },
  playerNumber: { type: String, required: true },
});
