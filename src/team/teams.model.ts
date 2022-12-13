import * as mongoose from 'mongoose';

export const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, default: '' },
  teamNickName: { type: String, required: true, default: '' },
  teamColor: { type: Object, required: false, default: '' },
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

  // players: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Player',
  // },
  // players: [
  //   {
  //     playerId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'Player',
  //       required: true,
  //     },
  //   },
  // ],

  // Maximillian
  // cart: {
  //   items: [
  //     {
  //       productId: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: 'Product',
  //         required: true,
  //       },
  //       quantity: { type: Number, required: true },
  //     },
  //   ],
  // },
});

// export interface TEAM_SCHEMA_TYPE {
//   teamName: string;
//   teamColor: string;
//   players: Array<any>;
// }
