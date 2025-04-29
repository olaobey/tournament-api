import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type MatchDocument = Match & Document;

export enum MatchStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Schema({ timestamps: true })
export class Match {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Tournament',
    required: true,
  })
  tournament: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Participant',
  })
  participant1: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Participant',
  })
  participant2: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Participant' })
  winner: MongooseSchema.Types.ObjectId;

  @Prop({ type: Number })
  participant1Score: number;

  @Prop({ type: Number })
  participant2Score: number;

  @Prop({ type: Date })
  scheduledTime: Date;

  @Prop({
    type: String,
    enum: Object.values(MatchStatus),
    default: MatchStatus.SCHEDULED,
  })
  status: MatchStatus;

  @Prop({ required: true })
  round: number;

  @Prop({ required: true })
  matchNumber: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Match' })
  nextMatch: MongooseSchema.Types.ObjectId;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
