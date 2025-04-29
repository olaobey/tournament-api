import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ParticipantDocument = Participant & Document;

@Schema({ timestamps: true })
export class Participant {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  contactEmail: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Tournament',
    required: true,
  })
  tournament: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  registeredBy: MongooseSchema.Types.ObjectId;

  @Prop({ default: false })
  eliminated: boolean;

  @Prop({ default: 0 })
  wins: number;

  @Prop({ default: 0 })
  losses: number;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
