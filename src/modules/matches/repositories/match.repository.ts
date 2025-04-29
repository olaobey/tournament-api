import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchDocument, MatchStatus } from '../schemas/match.schema';
import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { UpdateMatchResultDto } from '../dto/update-match-result.dto';

@Injectable()
export class MatchRepository {
  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
  ) {}
  async create(createMatchDto: CreateMatchDto): Promise<MatchDocument> {
    const createdMatch = new this.matchModel(createMatchDto);
    return createdMatch.save();
  }
  async findAll(): Promise<MatchDocument[]> {
    return this.matchModel.find().exec();
  }
  async findById(id: string): Promise<MatchDocument> {
    return this.matchModel.findById(id).exec();
  }
  async findByTournament(tournamentId: string): Promise<MatchDocument[]> {
    return this.matchModel.find({ tournament: tournamentId }).exec();
  }
  async findByTournamentAndRound(
    tournamentId: string,
    round: number,
  ): Promise<MatchDocument[]> {
    return this.matchModel.find({ tournament: tournamentId, round }).exec();
  }
  async findByParticipant(participantId: string): Promise<MatchDocument[]> {
    return this.matchModel
      .find({
        $or: [{ participant1: participantId }, { participant2: participantId }],
      })
      .exec();
  }
  async findByStatus(status: MatchStatus): Promise<MatchDocument[]> {
    return this.matchModel.find({ status }).exec();
  }
  async update(
    id: string,
    updateMatchDto: UpdateMatchDto,
  ): Promise<MatchDocument> {
    return this.matchModel
      .findByIdAndUpdate(id, updateMatchDto, { new: true })
      .exec();
  }
  async updateResult(
    id: string,
    updateMatchResultDto: UpdateMatchResultDto,
  ): Promise<MatchDocument> {
    return this.matchModel
      .findByIdAndUpdate(
        id,
        {
          participant1Score: updateMatchResultDto.participant1Score,
          participant2Score: updateMatchResultDto.participant2Score,
          winner: updateMatchResultDto.winner,
          status: MatchStatus.COMPLETED,
        },
        { new: true },
      )
      .exec();
  }
  async updateParticipantInNextMatch(
    matchId: string,
    nextMatchId: string,
    isFirstParticipant: boolean,
    winnerId: string,
  ): Promise<MatchDocument> {
    const updateField = isFirstParticipant
      ? { participant1: winnerId }
      : { participant2: winnerId };

    return this.matchModel
      .findByIdAndUpdate(nextMatchId, updateField, { new: true })
      .exec();
  }
  async remove(id: string): Promise<MatchDocument> {
    return this.matchModel.findByIdAndDelete(id).exec();
  }
  async removeByTournament(tournamentId: string): Promise<any> {
    return this.matchModel.deleteMany({ tournament: tournamentId }).exec();
  }
}
