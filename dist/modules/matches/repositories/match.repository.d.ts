import { Model } from 'mongoose';
import { MatchDocument, MatchStatus } from '../schemas/match.schema';
import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { UpdateMatchResultDto } from '../dto/update-match-result.dto';
export declare class MatchRepository {
    private matchModel;
    constructor(matchModel: Model<MatchDocument>);
    create(createMatchDto: CreateMatchDto): Promise<MatchDocument>;
    findAll(): Promise<MatchDocument[]>;
    findById(id: string): Promise<MatchDocument>;
    findByTournament(tournamentId: string): Promise<MatchDocument[]>;
    findByTournamentAndRound(tournamentId: string, round: number): Promise<MatchDocument[]>;
    findByParticipant(participantId: string): Promise<MatchDocument[]>;
    findByStatus(status: MatchStatus): Promise<MatchDocument[]>;
    update(id: string, updateMatchDto: UpdateMatchDto): Promise<MatchDocument>;
    updateResult(id: string, updateMatchResultDto: UpdateMatchResultDto): Promise<MatchDocument>;
    updateParticipantInNextMatch(matchId: string, nextMatchId: string, isFirstParticipant: boolean, winnerId: string): Promise<MatchDocument>;
    remove(id: string): Promise<MatchDocument>;
    removeByTournament(tournamentId: string): Promise<any>;
}
