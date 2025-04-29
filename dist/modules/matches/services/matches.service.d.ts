import { MatchRepository } from '../repositories/match.repository';
import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { UpdateMatchResultDto } from '../dto/update-match-result.dto';
import { MatchDocument } from '../schemas/match.schema';
import { TournamentsService } from '../../tournaments/services/tournaments.service';
import { ParticipantsService } from '../../participants/services/participants.service';
export declare class MatchesService {
    private readonly matchRepository;
    private readonly tournamentsService;
    private readonly participantsService;
    constructor(matchRepository: MatchRepository, tournamentsService: TournamentsService, participantsService: ParticipantsService);
    create(createMatchDto: CreateMatchDto): Promise<MatchDocument>;
    findAll(): Promise<MatchDocument[]>;
    findById(id: string): Promise<MatchDocument>;
    findByTournament(tournamentId: string): Promise<MatchDocument[]>;
    findByTournamentAndRound(tournamentId: string, round: number): Promise<MatchDocument[]>;
    findByParticipant(participantId: string): Promise<MatchDocument[]>;
    update(id: string, updateMatchDto: UpdateMatchDto): Promise<MatchDocument>;
    updateResult(id: string, updateMatchResultDto: UpdateMatchResultDto): Promise<MatchDocument>;
    private determineNextMatchPositionByMatchNumber;
    generateTournamentBracket(tournamentId: string): Promise<MatchDocument[]>;
    private shuffleArray;
    remove(id: string): Promise<MatchDocument>;
}
