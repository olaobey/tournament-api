import { TournamentRepository } from '../repositories/tournament.repository';
import { CreateTournamentDto } from '../dto/create-tournament.dto';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';
import { TournamentDocument, TournamentStatus } from '../schemas/tournament.schema';
export declare class TournamentsService {
    private readonly tournamentRepository;
    constructor(tournamentRepository: TournamentRepository);
    create(createTournamentDto: CreateTournamentDto, userId: string): Promise<TournamentDocument>;
    findAll(): Promise<TournamentDocument[]>;
    findById(id: string): Promise<TournamentDocument>;
    findByStatus(status: TournamentStatus): Promise<TournamentDocument[]>;
    findByUser(userId: string): Promise<TournamentDocument[]>;
    update(id: string, updateTournamentDto: UpdateTournamentDto): Promise<TournamentDocument>;
    incrementParticipants(id: string): Promise<TournamentDocument>;
    decrementParticipants(id: string): Promise<TournamentDocument>;
    remove(id: string): Promise<TournamentDocument>;
    private validateStatusChange;
}
