import { Document, Schema as MongooseSchema } from 'mongoose';
export type TournamentDocument = Tournament & Document;
export declare enum TournamentStatus {
    DRAFT = "draft",
    REGISTRATION = "registration",
    ONGOING = "ongoing",
    COMPLETED = "completed"
}
export declare class Tournament {
    name: string;
    description: string;
    maxParticipants: number;
    currentParticipants: number;
    status: TournamentStatus;
    startDate: Date;
    endDate: Date;
    createdBy: MongooseSchema.Types.ObjectId;
}
export declare const TournamentSchema: MongooseSchema<Tournament, import("mongoose").Model<Tournament, any, any, any, Document<unknown, any, Tournament> & Tournament & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Tournament, Document<unknown, {}, import("mongoose").FlatRecord<Tournament>> & import("mongoose").FlatRecord<Tournament> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
