import { Model } from 'mongoose';
import { ParticipantDocument } from '../schemas/participant.schema';
import { CreateParticipantDto } from '../dto/createParticipant.dto';
import { UpdateParticipantDto } from '../dto/updateParticipant.dto';
export declare class ParticipantRepository {
    private participantModel;
    constructor(participantModel: Model<ParticipantDocument>);
    create(createParticipantDto: CreateParticipantDto, userId?: string): Promise<ParticipantDocument>;
    findAll(): Promise<ParticipantDocument[]>;
    findById(id: string): Promise<ParticipantDocument>;
    findByTournament(tournamentId: string): Promise<ParticipantDocument[]>;
    findActiveByTournament(tournamentId: string): Promise<ParticipantDocument[]>;
    update(id: string, updateParticipantDto: UpdateParticipantDto): Promise<ParticipantDocument>;
    incrementWins(id: string): Promise<ParticipantDocument>;
    incrementLosses(id: string): Promise<ParticipantDocument>;
    remove(id: string): Promise<ParticipantDocument>;
    removeByTournament(tournamentId: string): Promise<any>;
}
