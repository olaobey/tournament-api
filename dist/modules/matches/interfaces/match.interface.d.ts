import { Document, Schema as MongooseSchema } from 'mongoose';
import { MatchStatus } from '../schemas/match.schema';
export interface IMatch extends Document {
    tournament: MongooseSchema.Types.ObjectId;
    participant1: MongooseSchema.Types.ObjectId;
    participant2: MongooseSchema.Types.ObjectId;
    winner?: MongooseSchema.Types.ObjectId;
    participant1Score?: number;
    participant2Score?: number;
    scheduledTime?: Date;
    status: MatchStatus;
    round: number;
    matchNumber: number;
    nextMatch?: MongooseSchema.Types.ObjectId;
}
