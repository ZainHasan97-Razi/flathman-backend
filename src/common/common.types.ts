import mongoose from 'mongoose';

export type MongoIdType = mongoose.Types.ObjectId;

export type RequestUserType = {userName: string, email: string, _id: MongoIdType}
