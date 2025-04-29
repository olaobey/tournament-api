import { Document, Schema } from 'mongoose';
import { TournamentStatus } from '../schemas/tournament.schema';
export interface ITournament extends Document {
    name: string;
    description?: string;
    maxParticipants: number;
    currentParticipants: number;
    status: TournamentStatus;
    startDate?: Date;
    endDate?: Date;
    createdBy: Schema.Types.ObjectId;
}
