import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TournamentDocument = Tournament & Document;

export enum TournamentStatus {
  DRAFT = 'draft',
  REGISTRATION = 'registration',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
}

@Schema({ timestamps: true })
export class Tournament {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  maxParticipants: number;

  @Prop({ default: 0 })
  currentParticipants: number;

  @Prop({
    type: String,
    enum: Object.values(TournamentStatus),
    default: TournamentStatus.DRAFT,
  })
  status: TournamentStatus;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: MongooseSchema.Types.ObjectId;
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
