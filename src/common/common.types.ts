import mongoose from 'mongoose';

export type MongoIdType = mongoose.Types.ObjectId;

export type RequestUserType = {email: string, _id: MongoIdType}
