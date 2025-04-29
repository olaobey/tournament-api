import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ParticipantRepository } from '../repositories/participant.repository';
import { CreateParticipantDto } from '../dto/createParticipant.dto';
import { UpdateParticipantDto } from '../dto/updateParticipant.dto';
import { ParticipantDocument } from '../schemas/participant.schema';
import { TournamentsService } from '../../tournaments/services/tournaments.service';
import { TournamentStatus } from '../../tournaments/schemas/tournament.schema';

@Injectable()
export class ParticipantsService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly tournamentsService: TournamentsService,
  ) {}

  async create(
    createParticipantDto: CreateParticipantDto,
    userId?: string,
  ): Promise<ParticipantDocument> {
    // Check if tournament exists and is in registration phase
    const tournament = await this.tournamentsService.findById(
      createParticipantDto.tournament,
    );

    if (tournament.status !== TournamentStatus.REGISTRATION) {
      throw new BadRequestException('Tournament is not open for registration');
    }

    if (tournament.currentParticipants >= tournament.maxParticipants) {
      throw new BadRequestException('Tournament is already full');
    }

    // Create participant and increment tournament participants count
    const participant = await this.participantRepository.create(
      createParticipantDto,
      userId,
    );
    await this.tournamentsService.incrementParticipants(
      createParticipantDto.tournament,
    );

    return participant;
  }

  async findAll(): Promise<ParticipantDocument[]> {
    return this.participantRepository.findAll();
  }

  async findById(id: string): Promise<ParticipantDocument> {
    const participant = await this.participantRepository.findById(id);
    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }
    return participant;
  }

  async findByTournament(tournamentId: string): Promise<ParticipantDocument[]> {
    await this.tournamentsService.findById(tournamentId);
    return this.participantRepository.findByTournament(tournamentId);
  }

  async findActiveByTournament(
    tournamentId: string,
  ): Promise<ParticipantDocument[]> {
    await this.tournamentsService.findById(tournamentId);
    return this.participantRepository.findActiveByTournament(tournamentId);
  }

  async update(
    id: string,
    updateParticipantDto: UpdateParticipantDto,
  ): Promise<ParticipantDocument> {
    await this.findById(id);
    return this.participantRepository.update(id, updateParticipantDto);
  }

  async remove(id: string): Promise<ParticipantDocument> {
    const participant = await this.findById(id);

    // Check if tournament allows removing participants
    const tournament = await this.tournamentsService.findById(
      participant.tournament.toString(),
    );

    if (
      tournament.status !== TournamentStatus.DRAFT &&
      tournament.status !== TournamentStatus.REGISTRATION
    ) {
      throw new BadRequestException(
        'Cannot remove participants from an active or completed tournament',
      );
    }

    // Decrement tournament participants count
    await this.tournamentsService.decrementParticipants(tournament.id);

    return this.participantRepository.remove(id);
  }

  async incrementWins(id: string): Promise<ParticipantDocument> {
    await this.findById(id);
    return this.participantRepository.incrementWins(id);
  }

  async incrementLosses(id: string): Promise<ParticipantDocument> {
    await this.findById(id);
    return this.participantRepository.incrementLosses(id);
  }
}
