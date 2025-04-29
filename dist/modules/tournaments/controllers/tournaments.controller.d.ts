import { TournamentsService } from '../services/tournaments.service';
import { CreateTournamentDto } from '../dto/create-tournament.dto';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';
import { TournamentStatus } from '../schemas/tournament.schema';
export declare class TournamentsController {
    private readonly tournamentsService;
    constructor(tournamentsService: TournamentsService);
    create(createTournamentDto: CreateTournamentDto, req: any): Promise<import("../schemas/tournament.schema").TournamentDocument>;
    findAll(): Promise<import("../schemas/tournament.schema").TournamentDocument[]>;
    findByStatus(status: TournamentStatus): Promise<import("../schemas/tournament.schema").TournamentDocument[]>;
    findByUser(req: any): Promise<import("../schemas/tournament.schema").TournamentDocument[]>;
    findOne(id: string): Promise<import("../schemas/tournament.schema").TournamentDocument>;
    update(id: string, updateTournamentDto: UpdateTournamentDto): Promise<import("../schemas/tournament.schema").TournamentDocument>;
    incrementParticipants(id: string): Promise<import("../schemas/tournament.schema").TournamentDocument>;
    decrementParticipants(id: string): Promise<import("../schemas/tournament.schema").TournamentDocument>;
    remove(id: string): Promise<import("../schemas/tournament.schema").TournamentDocument>;
}
