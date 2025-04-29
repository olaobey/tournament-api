import { ParticipantRepository } from '../repositories/participant.repository';
import { CreateParticipantDto } from '../dto/createParticipant.dto';
import { UpdateParticipantDto } from '../dto/updateParticipant.dto';
import { ParticipantDocument } from '../schemas/participant.schema';
import { TournamentsService } from '../../tournaments/services/tournaments.service';
export declare class ParticipantsService {
    private readonly participantRepository;
    private readonly tournamentsService;
    constructor(participantRepository: ParticipantRepository, tournamentsService: TournamentsService);
    create(createParticipantDto: CreateParticipantDto, userId?: string): Promise<ParticipantDocument>;
    findAll(): Promise<ParticipantDocument[]>;
    findById(id: string): Promise<ParticipantDocument>;
    findByTournament(tournamentId: string): Promise<ParticipantDocument[]>;
    findActiveByTournament(tournamentId: string): Promise<ParticipantDocument[]>;
    update(id: string, updateParticipantDto: UpdateParticipantDto): Promise<ParticipantDocument>;
    remove(id: string): Promise<ParticipantDocument>;
    incrementWins(id: string): Promise<ParticipantDocument>;
    incrementLosses(id: string): Promise<ParticipantDocument>;
}
