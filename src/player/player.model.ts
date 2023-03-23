import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, required: true },
  playerName: { type: String, required: true },
  email: { type: String },
  isCaptain: { type: String, default: false },
  homeJersey: { type: String, required: true },
  awayJersey: { type: String, required: true },
  position1: { type: String },
  position2: { type: String },
  height: { type: String },
  weight: { type: String },
  grade: { type: String },
  phone: { type: String },
});
