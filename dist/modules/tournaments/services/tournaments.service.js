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
exports.TournamentsService = void 0;
const common_1 = require("@nestjs/common");
const tournament_repository_1 = require("../repositories/tournament.repository");
const tournament_schema_1 = require("../schemas/tournament.schema");
let TournamentsService = class TournamentsService {
    constructor(tournamentRepository) {
        this.tournamentRepository = tournamentRepository;
    }
    async create(createTournamentDto, userId) {
        return this.tournamentRepository.create(createTournamentDto, userId);
    }
    async findAll() {
        return this.tournamentRepository.findAll();
    }
    async findById(id) {
        const tournament = await this.tournamentRepository.findById(id);
        if (!tournament) {
            throw new common_1.NotFoundException(`Tournament with ID ${id} not found`);
        }
        return tournament;
    }
    async findByStatus(status) {
        return this.tournamentRepository.findByStatus(status);
    }
    async findByUser(userId) {
        return this.tournamentRepository.findByUser(userId);
    }
    async update(id, updateTournamentDto) {
        const tournament = await this.findById(id);
        if (updateTournamentDto.status &&
            updateTournamentDto.status !== tournament.status) {
            this.validateStatusChange(tournament.status, updateTournamentDto.status, tournament);
        }
        return this.tournamentRepository.update(id, updateTournamentDto);
    }
    async incrementParticipants(id) {
        const tournament = await this.findById(id);
        if (tournament.currentParticipants >= tournament.maxParticipants) {
            throw new common_1.BadRequestException('Tournament has reached maximum participants');
        }
        return this.tournamentRepository.incrementParticipants(id);
    }
    async decrementParticipants(id) {
        await this.findById(id);
        return this.tournamentRepository.decrementParticipants(id);
    }
    async remove(id) {
        await this.findById(id);
        return this.tournamentRepository.remove(id);
    }
    validateStatusChange(currentStatus, newStatus, tournament) {
        if (currentStatus === tournament_schema_1.TournamentStatus.DRAFT) {
            if (newStatus !== tournament_schema_1.TournamentStatus.REGISTRATION) {
                throw new common_1.BadRequestException(`Cannot change status from ${currentStatus} to ${newStatus}`);
            }
        }
        else if (currentStatus === tournament_schema_1.TournamentStatus.REGISTRATION) {
            if (newStatus !== tournament_schema_1.TournamentStatus.ONGOING) {
                throw new common_1.BadRequestException(`Cannot change status from ${currentStatus} to ${newStatus}`);
            }
            if (tournament.currentParticipants < 2) {
                throw new common_1.BadRequestException('Tournament must have at least 2 participants to start');
            }
            const isPowerOfTwo = (n) => (n & (n - 1)) === 0;
            if (!isPowerOfTwo(tournament.currentParticipants)) {
                throw new common_1.BadRequestException('Single elimination tournament requires participant count to be a power of 2');
            }
        }
        else if (currentStatus === tournament_schema_1.TournamentStatus.ONGOING) {
            if (newStatus !== tournament_schema_1.TournamentStatus.COMPLETED) {
                throw new common_1.BadRequestException(`Cannot change status from ${currentStatus} to ${newStatus}`);
            }
        }
        else if (currentStatus === tournament_schema_1.TournamentStatus.COMPLETED) {
            throw new common_1.BadRequestException('Cannot change status of a completed tournament');
        }
    }
};
exports.TournamentsService = TournamentsService;
exports.TournamentsService = TournamentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tournament_repository_1.TournamentRepository])
], TournamentsService);
//# sourceMappingURL=tournaments.service.js.map