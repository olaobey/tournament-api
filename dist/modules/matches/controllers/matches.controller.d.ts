import { MatchesService } from '../services/matches.service';
import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { UpdateMatchResultDto } from '../dto/update-match-result.dto';
export declare class MatchesController {
    private readonly matchesService;
    constructor(matchesService: MatchesService);
    create(createMatchDto: CreateMatchDto): Promise<import("../schemas/match.schema").MatchDocument>;
    generateBracket(tournamentId: string): Promise<import("../schemas/match.schema").MatchDocument[]>;
    findAll(): Promise<import("../schemas/match.schema").MatchDocument[]>;
    findByTournament(tournamentId: string): Promise<import("../schemas/match.schema").MatchDocument[]>;
    findByTournamentAndRound(tournamentId: string, round: number): Promise<import("../schemas/match.schema").MatchDocument[]>;
    findByParticipant(participantId: string): Promise<import("../schemas/match.schema").MatchDocument[]>;
    findOne(id: string): Promise<import("../schemas/match.schema").MatchDocument>;
    update(id: string, updateMatchDto: UpdateMatchDto): Promise<import("../schemas/match.schema").MatchDocument>;
    updateResult(id: string, updateMatchResultDto: UpdateMatchResultDto): Promise<import("../schemas/match.schema").MatchDocument>;
    remove(id: string): Promise<import("../schemas/match.schema").MatchDocument>;
}
