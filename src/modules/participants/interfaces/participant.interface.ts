import { Document, Schema } from 'mongoose';

export interface IParticipant extends Document {
  name: string;
  description?: string;
  contactEmail?: string;
  tournament: Schema.Types.ObjectId;
  registeredBy?: Schema.Types.ObjectId;
  eliminated: boolean;
  wins: number;
  losses: number;
}
