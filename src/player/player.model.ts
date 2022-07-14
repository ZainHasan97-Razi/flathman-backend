import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, required: true },
  playerName: { type: String, required: true },
  email: { type: String, required: true },
  isCaptain: { type: String, required: true, default: false },
  homeJersey: { type: String, required: true },
  awayJersey: { type: String, required: true },
  position1: { type: String, required: true },
  position2: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  grade: { type: String, required: true },
  phone: { type: Number, required: true },
});
