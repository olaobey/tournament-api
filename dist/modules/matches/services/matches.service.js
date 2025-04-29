"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchesService = void 0;
const common_1 = require("@nestjs/common");
const match_repository_1 = require("../repositories/match.repository");
const match_schema_1 = require("../schemas/match.schema");
const tournaments_service_1 = require("../../tournaments/services/tournaments.service");
const participants_service_1 = require("../../participants/services/participants.service");
const tournament_schema_1 = require("../../tournaments/schemas/tournament.schema");
let MatchesService = class MatchesService {
    constructor(matchRepository, tournamentsService, participantsService) {
        this.matchRepository = matchRepository;
        this.tournamentsService = tournamentsService;
        this.participantsService = participantsService;
    }
    async create(createMatchDto) {
        const tournament = await this.tournamentsService.findById(createMatchDto.tournament);
        if (tournament.status !== tournament_schema_1.TournamentStatus.ONGOING) {
            throw new common_1.BadRequestException('Can only create matches for ongoing tournaments');
        }
        const participant1 = await this.participantsService.findById(createMatchDto.participant1);
        const participant2 = await this.participantsService.findById(createMatchDto.participant2);
        if (participant1.tournament.toString() !== createMatchDto.tournament) {
            throw new common_1.BadRequestException('Participant 1 does not belong to the specified tournament');
        }
        if (participant2.tournament.toString() !== createMatchDto.tournament) {
            throw new common_1.BadRequestException('Participant 2 does not belong to the specified tournament');
        }
        if (createMatchDto.nextMatch) {
            const nextMatch = await this.matchRepository.findById(createMatchDto.nextMatch);
            if (!nextMatch) {
                throw new common_1.NotFoundException(`Next match with ID ${createMatchDto.nextMatch} not found`);
            }
        }
        return this.matchRepository.create(createMatchDto);
    }
    async findAll() {
        return this.matchRepository.findAll();
    }
    async findById(id) {
        const match = await this.matchRepository.findById(id);
        if (!match) {
            throw new common_1.NotFoundException(`Match with ID ${id} not found`);
        }
        return match;
    }
    async findByTournament(tournamentId) {
        await this.tournamentsService.findById(tournamentId);
        return this.matchRepository.findByTournament(tournamentId);
    }
    async findByTournamentAndRound(tournamentId, round) {
        await this.tournamentsService.findById(tournamentId);
        return this.matchRepository.findByTournamentAndRound(tournamentId, round);
    }
    async findByParticipant(participantId) {
        await this.participantsService.findById(participantId);
        return this.matchRepository.findByParticipant(participantId);
    }
    async update(id, updateMatchDto) {
        await this.findById(id);
        return this.matchRepository.update(id, updateMatchDto);
    }
    async updateResult(id, updateMatchResultDto) {
        const match = await this.findById(id);
        if (updateMatchResultDto.winner !== match.participant1.toString() &&
            updateMatchResultDto.winner !== match.participant2.toString()) {
            throw new common_1.BadRequestException('Winner must be one of the match participants');
        }
        const isParticipant1Winner = updateMatchResultDto.winner === match.participant1.toString();
        if (isParticipant1Winner &&
            updateMatchResultDto.participant1Score <=
                updateMatchResultDto.participant2Score) {
            throw new common_1.BadRequestException('Winner score must be greater than loser score');
        }
        if (!isParticipant1Winner &&
            updateMatchResultDto.participant2Score <=
                updateMatchResultDto.participant1Score) {
            throw new common_1.BadRequestException('Winner score must be greater than loser score');
        }
        await this.participantsService.incrementWins(updateMatchResultDto.winner);
        const loserId = isParticipant1Winner
            ? match.participant2.toString()
            : match.participant1.toString();
        await this.participantsService.incrementLosses(loserId);
        const updatedMatch = await this.matchRepository.updateResult(id, updateMatchResultDto);
        if (match.nextMatch) {
            const nextMatch = await this.findById(match.nextMatch.toString());
            const isFirstParticipant = this.determineNextMatchPositionByMatchNumber(match.matchNumber);
            await this.matchRepository.updateParticipantInNextMatch(match.id, nextMatch.id, isFirstParticipant, updateMatchResultDto.winner);
        }
        else {
            const tournament = await this.tournamentsService.findById(match.tournament.toString());
            if (tournament.status === tournament_schema_1.TournamentStatus.ONGOING) {
                const remainingMatches = await this.matchRepository.findByTournament(tournament.id);
                const allMatchesCompleted = remainingMatches.every((m) => m.status === match_schema_1.MatchStatus.COMPLETED);
                if (allMatchesCompleted) {
                    await this.tournamentsService.update(tournament.id, {
                        status: tournament_schema_1.TournamentStatus.COMPLETED,
                    });
                }
            }
        }
        return updatedMatch;
    }
    determineNextMatchPositionByMatchNumber(matchNumber) {
        return matchNumber % 2 === 0;
    }
    async generateTournamentBracket(tournamentId) {
        const tournament = await this.tournamentsService.findById(tournamentId);
        if (tournament.status !== tournament_schema_1.TournamentStatus.REGISTRATION) {
            throw new common_1.BadRequestException('Can only generate brackets for tournaments in registration status');
        }
        const participants = await this.participantsService.findByTournament(tournamentId);
        if (participants.length < 2) {
            throw new common_1.BadRequestException('Tournament must have at least 2 participants');
        }
        const isPowerOfTwo = (n) => (n & (n - 1)) === 0;
        if (!isPowerOfTwo(participants.length)) {
            throw new common_1.BadRequestException('Single elimination tournament requires participant count to be a power of 2');
        }
        const shuffledParticipants = this.shuffleArray([
            ...participants,
        ]);
        const numberOfRounds = Math.log2(participants.length);
        const createdMatches = [];
        let finalMatch = await this.matchRepository.create({
            tournament: tournamentId,
            participant1: null,
            participant2: null,
            round: numberOfRounds,
            matchNumber: 1,
            status: match_schema_1.MatchStatus.SCHEDULED,
            scheduledTime: new Date(Date.now() + 86400000),
        });
        createdMatches.push(finalMatch);
        for (let round = numberOfRounds - 1; round >= 1; round--) {
            const matchesInRound = Math.pow(2, round - 1);
            for (let matchIndex = 0; matchIndex < matchesInRound; matchIndex++) {
                const matchNumber = matchIndex + 1;
                const nextMatchNumber = Math.ceil(matchNumber / 2);
                const nextMatchRound = round + 1;
                const nextMatch = createdMatches.find((m) => m.round === nextMatchRound && m.matchNumber === nextMatchNumber);
                if (round === 1) {
                    const participantIndex1 = matchIndex * 2;
                    const participantIndex2 = matchIndex * 2 + 1;
                    const match = await this.matchRepository.create({
                        tournament: tournamentId,
                        participant1: shuffledParticipants[participantIndex1]._id.toString(),
                        participant2: shuffledParticipants[participantIndex2]._id.toString(),
                        round,
                        matchNumber,
                        nextMatch: nextMatch._id.toString(),
                        status: match_schema_1.MatchStatus.SCHEDULED,
                        scheduledTime: new Date(Date.now() + 3600000),
                    });
                    createdMatches.push(match);
                }
                else {
                    const match = await this.matchRepository.create({
                        tournament: tournamentId,
                        participant1: null,
                        participant2: null,
                        round,
                        matchNumber,
                        nextMatch: nextMatch._id.toString(),
                        status: match_schema_1.MatchStatus.SCHEDULED,
                        scheduledTime: new Date(Date.now() + (numberOfRounds - round + 1) * 3600000),
                    });
                    createdMatches.push(match);
                }
            }
        }
        await this.tournamentsService.update(tournamentId, {
            status: tournament_schema_1.TournamentStatus.ONGOING,
            startDate: new Date(),
        });
        return createdMatches.sort((a, b) => a.round - b.round || a.matchNumber - b.matchNumber);
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    async remove(id) {
        const match = await this.findById(id);
        if (match.status !== match_schema_1.MatchStatus.SCHEDULED) {
            throw new common_1.BadRequestException('Cannot delete match that is in progress or completed');
        }
        return this.matchRepository.remove(id);
    }
};
exports.MatchesService = MatchesService;
exports.MatchesService = MatchesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [match_repository_1.MatchRepository,
        tournaments_service_1.TournamentsService,
        participants_service_1.ParticipantsService])
], MatchesService);
//# sourceMappingURL=matches.service.js.map