import { Document, Schema as MongooseSchema } from 'mongoose';
export type ParticipantDocument = Participant & Document;
export declare class Participant {
    name: string;
    description: string;
    contactEmail: string;
    tournament: MongooseSchema.Types.ObjectId;
    registeredBy: MongooseSchema.Types.ObjectId;
    eliminated: boolean;
    wins: number;
    losses: number;
}
export declare const ParticipantSchema: MongooseSchema<Participant, import("mongoose").Model<Participant, any, any, any, Document<unknown, any, Participant> & Participant & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Participant, Document<unknown, {}, import("mongoose").FlatRecord<Participant>> & import("mongoose").FlatRecord<Participant> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
