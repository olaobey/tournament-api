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
exports.ParticipantsService = void 0;
const common_1 = require("@nestjs/common");
const participant_repository_1 = require("../repositories/participant.repository");
const tournaments_service_1 = require("../../tournaments/services/tournaments.service");
const tournament_schema_1 = require("../../tournaments/schemas/tournament.schema");
let ParticipantsService = class ParticipantsService {
    constructor(participantRepository, tournamentsService) {
        this.participantRepository = participantRepository;
        this.tournamentsService = tournamentsService;
    }
    async create(createParticipantDto, userId) {
        const tournament = await this.tournamentsService.findById(createParticipantDto.tournament);
        if (tournament.status !== tournament_schema_1.TournamentStatus.REGISTRATION) {
            throw new common_1.BadRequestException('Tournament is not open for registration');
        }
        if (tournament.currentParticipants >= tournament.maxParticipants) {
            throw new common_1.BadRequestException('Tournament is already full');
        }
        const participant = await this.participantRepository.create(createParticipantDto, userId);
        await this.tournamentsService.incrementParticipants(createParticipantDto.tournament);
        return participant;
    }
    async findAll() {
        return this.participantRepository.findAll();
    }
    async findById(id) {
        const participant = await this.participantRepository.findById(id);
        if (!participant) {
            throw new common_1.NotFoundException(`Participant with ID ${id} not found`);
        }
        return participant;
    }
    async findByTournament(tournamentId) {
        await this.tournamentsService.findById(tournamentId);
        return this.participantRepository.findByTournament(tournamentId);
    }
    async findActiveByTournament(tournamentId) {
        await this.tournamentsService.findById(tournamentId);
        return this.participantRepository.findActiveByTournament(tournamentId);
    }
    async update(id, updateParticipantDto) {
        await this.findById(id);
        return this.participantRepository.update(id, updateParticipantDto);
    }
    async remove(id) {
        const participant = await this.findById(id);
        const tournament = await this.tournamentsService.findById(participant.tournament.toString());
        if (tournament.status !== tournament_schema_1.TournamentStatus.DRAFT &&
            tournament.status !== tournament_schema_1.TournamentStatus.REGISTRATION) {
            throw new common_1.BadRequestException('Cannot remove participants from an active or completed tournament');
        }
        await this.tournamentsService.decrementParticipants(tournament.id);
        return this.participantRepository.remove(id);
    }
    async incrementWins(id) {
        await this.findById(id);
        return this.participantRepository.incrementWins(id);
    }
    async incrementLosses(id) {
        await this.findById(id);
        return this.participantRepository.incrementLosses(id);
    }
};
exports.ParticipantsService = ParticipantsService;
exports.ParticipantsService = ParticipantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [participant_repository_1.ParticipantRepository,
        tournaments_service_1.TournamentsService])
], ParticipantsService);
//# sourceMappingURL=participants.service.js.map