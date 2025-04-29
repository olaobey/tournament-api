import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Tournament,
  TournamentDocument,
  TournamentStatus,
} from '../schemas/tournament.schema';
import { CreateTournamentDto } from '../dto/create-tournament.dto';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';

@Injectable()
export class TournamentRepository {
  constructor(
    @InjectModel(Tournament.name)
    private tournamentModel: Model<TournamentDocument>,
  ) {}

  async create(
    createTournamentDto: CreateTournamentDto,
    userId: string,
  ): Promise<TournamentDocument> {
    const createdTournament = new this.tournamentModel({
      ...createTournamentDto,
      createdBy: userId,
      currentParticipants: 0,
    });

    return createdTournament.save();
  }

  async findAll(): Promise<TournamentDocument[]> {
    return this.tournamentModel.find().exec();
  }

  async findById(id: string): Promise<TournamentDocument> {
    return this.tournamentModel.findById(id).exec();
  }

  async findByStatus(status: TournamentStatus): Promise<TournamentDocument[]> {
    return this.tournamentModel.find({ status }).exec();
  }

  async findByUser(userId: string): Promise<TournamentDocument[]> {
    return this.tournamentModel.find({ createdBy: userId }).exec();
  }

  async update(
    id: string,
    updateTournamentDto: UpdateTournamentDto,
  ): Promise<TournamentDocument> {
    return this.tournamentModel
      .findByIdAndUpdate(id, updateTournamentDto, { new: true })
      .exec();
  }

  async incrementParticipants(id: string): Promise<TournamentDocument> {
    return this.tournamentModel
      .findByIdAndUpdate(
        id,
        { $inc: { currentParticipants: 1 } },
        { new: true },
      )
      .exec();
  }

  async decrementParticipants(id: string): Promise<TournamentDocument> {
    return this.tournamentModel
      .findByIdAndUpdate(
        id,
        { $inc: { currentParticipants: -1 } },
        { new: true },
      )
      .exec();
  }

  async remove(id: string): Promise<TournamentDocument> {
    return this.tournamentModel.findByIdAndDelete(id).exec();
  }
}
