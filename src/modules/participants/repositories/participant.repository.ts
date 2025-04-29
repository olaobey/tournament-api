import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Participant,
  ParticipantDocument,
} from '../schemas/participant.schema';
import { CreateParticipantDto } from '../dto/createParticipant.dto';
import { UpdateParticipantDto } from '../dto/updateParticipant.dto';

@Injectable()
export class ParticipantRepository {
  constructor(
    @InjectModel(Participant.name)
    private participantModel: Model<ParticipantDocument>,
  ) {}

  async create(
    createParticipantDto: CreateParticipantDto,
    userId?: string,
  ): Promise<ParticipantDocument> {
    const createdParticipant = new this.participantModel({
      ...createParticipantDto,
      registeredBy: userId,
    });

    return createdParticipant.save();
  }
  async findAll(): Promise<ParticipantDocument[]> {
    return this.participantModel.find().exec();
  }
  async findById(id: string): Promise<ParticipantDocument> {
    return this.participantModel.findById(id).exec();
  }
  async findByTournament(tournamentId: string): Promise<ParticipantDocument[]> {
    return this.participantModel.find({ tournament: tournamentId }).exec();
  }
  async findActiveByTournament(
    tournamentId: string,
  ): Promise<ParticipantDocument[]> {
    return this.participantModel
      .find({ tournament: tournamentId, eliminated: false })
      .exec();
  }
  async update(
    id: string,
    updateParticipantDto: UpdateParticipantDto,
  ): Promise<ParticipantDocument> {
    return this.participantModel
      .findByIdAndUpdate(id, updateParticipantDto, { new: true })
      .exec();
  }
  async incrementWins(id: string): Promise<ParticipantDocument> {
    return this.participantModel
      .findByIdAndUpdate(id, { $inc: { wins: 1 } }, { new: true })
      .exec();
  }
  async incrementLosses(id: string): Promise<ParticipantDocument> {
    return this.participantModel
      .findByIdAndUpdate(
        id,
        { $inc: { losses: 1 }, eliminated: true },
        { new: true },
      )
      .exec();
  }
  async remove(id: string): Promise<ParticipantDocument> {
    return this.participantModel.findByIdAndDelete(id).exec();
  }
  async removeByTournament(tournamentId: string): Promise<any> {
    return this.participantModel
      .deleteMany({ tournament: tournamentId })
      .exec();
  }
}
