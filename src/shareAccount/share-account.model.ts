import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoIdType } from 'src/common/common.types';

export const ShareAccountStatusEnum = {
  pending: "pending",
  accepted: "accepted",
  revoked: "revoked",
  left: "left",
} as const;
export type ShareAccountStatusEnumType = keyof typeof ShareAccountStatusEnum;

@Schema({ timestamps: false, _id: false })
export class InvitedTeam {
  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: "Team"})
  teamId: MongoIdType

  @Prop({type: String, required: true})
  role: string;
}
export const InvitedTeamSchema = SchemaFactory.createForClass(InvitedTeam);

@Schema({timestamps: true})
export class ShareAccount {
  @Prop({type: mongoose.Types.ObjectId, required: true, ref: "User"})
  ownerId: MongoIdType;

  @Prop({type: String, required: true})
  ownerEmail: string;

  @Prop({type: String, required: true})
  guestEmail: string;

  @Prop({type: String, required: true})
  guestName: string;

  @Prop({type: String, enum: ShareAccountStatusEnum, default: ShareAccountStatusEnum.pending})
  status: ShareAccountStatusEnumType;

  @Prop({type: [InvitedTeamSchema], required: true})
  teams: [InvitedTeam]
}

export type ShareAccountDocument = ShareAccount & Document;

export const ShareAccountSchema = SchemaFactory.createForClass(ShareAccount);
// ShareAccountSchema.index({slug: 1});
// ShareAccountSchema.index({status: 1});