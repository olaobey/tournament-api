import { Document, Schema as MongooseSchema } from 'mongoose';
export type MatchDocument = Match & Document;
export declare enum MatchStatus {
    SCHEDULED = "scheduled",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed"
}
export declare class Match {
    tournament: MongooseSchema.Types.ObjectId;
    participant1: MongooseSchema.Types.ObjectId;
    participant2: MongooseSchema.Types.ObjectId;
    winner: MongooseSchema.Types.ObjectId;
    participant1Score: number;
    participant2Score: number;
    scheduledTime: Date;
    status: MatchStatus;
    round: number;
    matchNumber: number;
    nextMatch: MongooseSchema.Types.ObjectId;
}
export declare const MatchSchema: MongooseSchema<Match, import("mongoose").Model<Match, any, any, any, Document<unknown, any, Match> & Match & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Match, Document<unknown, {}, import("mongoose").FlatRecord<Match>> & import("mongoose").FlatRecord<Match> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
