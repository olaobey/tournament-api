import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MatchRepository } from '../repositories/match.repository';
import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { UpdateMatchResultDto } from '../dto/update-match-result.dto';
import { MatchDocument, MatchStatus } from '../schemas/match.schema';
import { TournamentsService } from '../../tournaments/services/tournaments.service';
import { ParticipantsService } from '../../participants/services/participants.service';
import { TournamentStatus } from '../../tournaments/schemas/tournament.schema';
import { ParticipantDocument } from '../../participants/schemas/participant.schema';

@Injectable()
export class MatchesService {
  constructor(
    private readonly matchRepository: MatchRepository,
    private readonly tournamentsService: TournamentsService,
    private readonly participantsService: ParticipantsService,
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<MatchDocument> {
    // Validate tournament exists and is in correct status
    const tournament = await this.tournamentsService.findById(
      createMatchDto.tournament,
    );

    if (tournament.status !== TournamentStatus.ONGOING) {
      throw new BadRequestException(
        'Can only create matches for ongoing tournaments',
      );
    }

    // Validate participants exist and belong to the tournament
    const participant1 = await this.participantsService.findById(
      createMatchDto.participant1,
    );
    const participant2 = await this.participantsService.findById(
      createMatchDto.participant2,
    );

    if (participant1.tournament.toString() !== createMatchDto.tournament) {
      throw new BadRequestException(
        'Participant 1 does not belong to the specified tournament',
      );
    }

    if (participant2.tournament.toString() !== createMatchDto.tournament) {
      throw new BadRequestException(
        'Participant 2 does not belong to the specified tournament',
      );
    }

    // Check if next match exists if provided
    if (createMatchDto.nextMatch) {
      const nextMatch = await this.matchRepository.findById(
        createMatchDto.nextMatch,
      );
      if (!nextMatch) {
        throw new NotFoundException(
          `Next match with ID ${createMatchDto.nextMatch} not found`,
        );
      }
    }

    return this.matchRepository.create(createMatchDto);
  }

  async findAll(): Promise<MatchDocument[]> {
    return this.matchRepository.findAll();
  }

  async findById(id: string): Promise<MatchDocument> {
    const match = await this.matchRepository.findById(id);
    if (!match) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }
    return match;
  }

  async findByTournament(tournamentId: string): Promise<MatchDocument[]> {
    await this.tournamentsService.findById(tournamentId);
    return this.matchRepository.findByTournament(tournamentId);
  }

  async findByTournamentAndRound(
    tournamentId: string,
    round: number,
  ): Promise<MatchDocument[]> {
    await this.tournamentsService.findById(tournamentId);
    return this.matchRepository.findByTournamentAndRound(tournamentId, round);
  }

  async findByParticipant(participantId: string): Promise<MatchDocument[]> {
    await this.participantsService.findById(participantId);
    return this.matchRepository.findByParticipant(participantId);
  }

  async update(
    id: string,
    updateMatchDto: UpdateMatchDto,
  ): Promise<MatchDocument> {
    await this.findById(id);
    return this.matchRepository.update(id, updateMatchDto);
  }

  async updateResult(
    id: string,
    updateMatchResultDto: UpdateMatchResultDto,
  ): Promise<MatchDocument> {
    const match = await this.findById(id);

    // Validate winner is one of the participants
    if (
      updateMatchResultDto.winner !== match.participant1.toString() &&
      updateMatchResultDto.winner !== match.participant2.toString()
    ) {
      throw new BadRequestException(
        'Winner must be one of the match participants',
      );
    }

    // Check scores are valid for the winner
    const isParticipant1Winner =
      updateMatchResultDto.winner === match.participant1.toString();
    if (
      isParticipant1Winner &&
      updateMatchResultDto.participant1Score <=
        updateMatchResultDto.participant2Score
    ) {
      throw new BadRequestException(
        'Winner score must be greater than loser score',
      );
    }

    if (
      !isParticipant1Winner &&
      updateMatchResultDto.participant2Score <=
        updateMatchResultDto.participant1Score
    ) {
      throw new BadRequestException(
        'Winner score must be greater than loser score',
      );
    }

    // Update participant statistics
    await this.participantsService.incrementWins(updateMatchResultDto.winner);

    const loserId = isParticipant1Winner
      ? match.participant2.toString()
      : match.participant1.toString();

    await this.participantsService.incrementLosses(loserId);

    // Update the match with the result
    const updatedMatch = await this.matchRepository.updateResult(
      id,
      updateMatchResultDto,
    );

    // If there's a next match, update it with the winner
    if (match.nextMatch) {
      // Determine if winner goes to participant1 or participant2 slot in next match
      const nextMatch = await this.findById(match.nextMatch.toString());
      const isFirstParticipant = this.determineNextMatchPositionByMatchNumber(
        match.matchNumber,
      );

      await this.matchRepository.updateParticipantInNextMatch(
        match.id,
        nextMatch.id,
        isFirstParticipant,
        updateMatchResultDto.winner,
      );
    } else {
      // If this is the final match, update the tournament status
      const tournament = await this.tournamentsService.findById(
        match.tournament.toString(),
      );
      if (tournament.status === TournamentStatus.ONGOING) {
        const remainingMatches = await this.matchRepository.findByTournament(
          tournament.id,
        );
        const allMatchesCompleted = remainingMatches.every(
          (m) => m.status === MatchStatus.COMPLETED,
        );

        if (allMatchesCompleted) {
          await this.tournamentsService.update(tournament.id, {
            status: TournamentStatus.COMPLETED,
          });
        }
      }
    }

    return updatedMatch;
  }

  // Helper method to determine if a winner goes to participant1 or participant2 slot
  private determineNextMatchPositionByMatchNumber(
    matchNumber: number,
  ): boolean {
    // In binary tree, even-numbered matches send winners to participant1 slot
    // Odd-numbered matches send winners to participant2 slot
    return matchNumber % 2 === 0;
  }

  async generateTournamentBracket(
    tournamentId: string,
  ): Promise<MatchDocument[]> {
    // Validate tournament exists and is ready for bracket generation
    const tournament = await this.tournamentsService.findById(tournamentId);

    if (tournament.status !== TournamentStatus.REGISTRATION) {
      throw new BadRequestException(
        'Can only generate brackets for tournaments in registration status',
      );
    }

    // Get participants
    const participants =
      await this.participantsService.findByTournament(tournamentId);

    if (participants.length < 2) {
      throw new BadRequestException(
        'Tournament must have at least 2 participants',
      );
    }

    // Check if participant count is a power of 2 for single elimination
    const isPowerOfTwo = (n: number) => (n & (n - 1)) === 0;
    if (!isPowerOfTwo(participants.length)) {
      throw new BadRequestException(
        'Single elimination tournament requires participant count to be a power of 2',
      );
    }

    // Shuffle participants for random seeding
    const shuffledParticipants = this.shuffleArray<ParticipantDocument>([
      ...participants,
    ]);

    // Calculate number of rounds
    const numberOfRounds = Math.log2(participants.length);

    // Generate matches
    const createdMatches: MatchDocument[] = [];

    // Create final match first
    let finalMatch = await this.matchRepository.create({
      tournament: tournamentId,
      participant1: null,
      participant2: null,
      round: numberOfRounds,
      matchNumber: 1,
      status: MatchStatus.SCHEDULED,
      scheduledTime: new Date(Date.now() + 86400000),
    });

    createdMatches.push(finalMatch);

    // Create matches for each round from penultimate to first
    for (let round = numberOfRounds - 1; round >= 1; round--) {
      const matchesInRound = Math.pow(2, round - 1);

      for (let matchIndex = 0; matchIndex < matchesInRound; matchIndex++) {
        const matchNumber = matchIndex + 1;

        // Calculate next match
        const nextMatchNumber = Math.ceil(matchNumber / 2);
        const nextMatchRound = round + 1;

        // Find the next match
        const nextMatch = createdMatches.find(
          (m) =>
            m.round === nextMatchRound && m.matchNumber === nextMatchNumber,
        );

        // Create current match
        if (round === 1) {
          // First round has actual participants
          const participantIndex1 = matchIndex * 2;
          const participantIndex2 = matchIndex * 2 + 1;

          const match = await this.matchRepository.create({
            tournament: tournamentId,
            participant1:
              shuffledParticipants[participantIndex1]._id.toString(),
            participant2:
              shuffledParticipants[participantIndex2]._id.toString(),
            round,
            matchNumber,
            nextMatch: nextMatch._id.toString(),
            status: MatchStatus.SCHEDULED,
            scheduledTime: new Date(Date.now() + 3600000),
          });

          createdMatches.push(match);
        } else {
          // Other rounds have undefined participants until previous matches are completed
          const match = await this.matchRepository.create({
            tournament: tournamentId,
            participant1: null,
            participant2: null,
            round,
            matchNumber,
            nextMatch: nextMatch._id.toString(),
            status: MatchStatus.SCHEDULED,
            scheduledTime: new Date(
              Date.now() + (numberOfRounds - round + 1) * 3600000,
            ),
          });

          createdMatches.push(match);
        }
      }
    }

    // Update tournament status to ONGOING
    await this.tournamentsService.update(tournamentId, {
      status: TournamentStatus.ONGOING,
      startDate: new Date(),
    });

    return createdMatches.sort(
      (a, b) => a.round - b.round || a.matchNumber - b.matchNumber,
    );
  }

  // Fisher-Yates shuffle algorithm for randomizing participants
  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async remove(id: string): Promise<MatchDocument> {
    const match = await this.findById(id);

    // Check if match can be deleted
    if (match.status !== MatchStatus.SCHEDULED) {
      throw new BadRequestException(
        'Cannot delete match that is in progress or completed',
      );
    }

    return this.matchRepository.remove(id);
  }
}
