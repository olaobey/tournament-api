import { ParticipantsService } from '../services/participants.service';
import { CreateParticipantDto } from '../dto/createParticipant.dto';
import { UpdateParticipantDto } from '../dto/updateParticipant.dto';
export declare class ParticipantsController {
    private readonly participantsService;
    constructor(participantsService: ParticipantsService);
    create(createParticipantDto: CreateParticipantDto, req: any): Promise<import("../schemas/participant.schema").ParticipantDocument>;
    findAll(): Promise<import("../schemas/participant.schema").ParticipantDocument[]>;
    findByTournament(tournamentId: string): Promise<import("../schemas/participant.schema").ParticipantDocument[]>;
    findActiveByTournament(tournamentId: string): Promise<import("../schemas/participant.schema").ParticipantDocument[]>;
    findOne(id: string): Promise<import("../schemas/participant.schema").ParticipantDocument>;
    update(id: string, updateParticipantDto: UpdateParticipantDto): Promise<import("../schemas/participant.schema").ParticipantDocument>;
    remove(id: string): Promise<import("../schemas/participant.schema").ParticipantDocument>;
}
