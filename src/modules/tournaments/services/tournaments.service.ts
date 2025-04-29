import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TournamentRepository } from '../repositories/tournament.repository';
import { CreateTournamentDto } from '../dto/create-tournament.dto';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';
import {
  TournamentDocument,
  TournamentStatus,
} from '../schemas/tournament.schema';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class TournamentsService {
  constructor(private readonly tournamentRepository: TournamentRepository) {}

  async create(
    createTournamentDto: CreateTournamentDto,
    userId: string,
  ): Promise<TournamentDocument> {
    return this.tournamentRepository.create(createTournamentDto, userId);
  }

  async findAll(): Promise<TournamentDocument[]> {
    return this.tournamentRepository.findAll();
  }

  async findById(id: string): Promise<TournamentDocument> {
    const tournament = await this.tournamentRepository.findById(id);
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
    return tournament;
  }

  async findByStatus(status: TournamentStatus): Promise<TournamentDocument[]> {
    return this.tournamentRepository.findByStatus(status);
  }

  async findByUser(userId: string): Promise<TournamentDocument[]> {
    return this.tournamentRepository.findByUser(userId);
  }

  async update(
    id: string,
    updateTournamentDto: UpdateTournamentDto,
  ): Promise<TournamentDocument> {
    const tournament = await this.findById(id);

    // Check if status change is valid
    if (
      updateTournamentDto.status &&
      updateTournamentDto.status !== tournament.status
    ) {
      this.validateStatusChange(
        tournament.status,
        updateTournamentDto.status,
        tournament,
      );
    }

    return this.tournamentRepository.update(id, updateTournamentDto);
  }
  async incrementParticipants(id: string): Promise<TournamentDocument> {
    const tournament = await this.findById(id);

    if (tournament.currentParticipants >= tournament.maxParticipants) {
      throw new BadRequestException(
        'Tournament has reached maximum participants',
      );
    }

    return this.tournamentRepository.incrementParticipants(id);
  }
  async decrementParticipants(id: string): Promise<TournamentDocument> {
    await this.findById(id);
    return this.tournamentRepository.decrementParticipants(id);
  }
  async remove(id: string): Promise<TournamentDocument> {
    await this.findById(id);
    return this.tournamentRepository.remove(id);
  }
  private validateStatusChange(
    currentStatus: TournamentStatus,
    newStatus: TournamentStatus,
    tournament: TournamentDocument,
  ): void {
    // Check valid status transitions
    if (currentStatus === TournamentStatus.DRAFT) {
      if (newStatus !== TournamentStatus.REGISTRATION) {
        throw new BadRequestException(
          `Cannot change status from ${currentStatus} to ${newStatus}`,
        );
      }
    } else if (currentStatus === TournamentStatus.REGISTRATION) {
      if (newStatus !== TournamentStatus.ONGOING) {
        throw new BadRequestException(
          `Cannot change status from ${currentStatus} to ${newStatus}`,
        );
      }

      // Check if tournament has enough participants to start
      if (tournament.currentParticipants < 2) {
        throw new BadRequestException(
          'Tournament must have at least 2 participants to start',
        );
      }

      // Check if participant count is a power of 2 for single elimination
      const isPowerOfTwo = (n: number) => (n & (n - 1)) === 0;
      if (!isPowerOfTwo(tournament.currentParticipants)) {
        throw new BadRequestException(
          'Single elimination tournament requires participant count to be a power of 2',
        );
      }
    } else if (currentStatus === TournamentStatus.ONGOING) {
      if (newStatus !== TournamentStatus.COMPLETED) {
        throw new BadRequestException(
          `Cannot change status from ${currentStatus} to ${newStatus}`,
        );
      }
    } else if (currentStatus === TournamentStatus.COMPLETED) {
      throw new BadRequestException(
        'Cannot change status of a completed tournament',
      );
    }
  }
}
