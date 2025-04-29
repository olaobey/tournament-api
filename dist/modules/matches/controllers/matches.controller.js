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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const matches_service_1 = require("../services/matches.service");
const create_match_dto_1 = require("../dto/create-match.dto");
const update_match_dto_1 = require("../dto/update-match.dto");
const update_match_result_dto_1 = require("../dto/update-match-result.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
let MatchesController = class MatchesController {
    constructor(matchesService) {
        this.matchesService = matchesService;
    }
    create(createMatchDto) {
        return this.matchesService.create(createMatchDto);
    }
    generateBracket(tournamentId) {
        return this.matchesService.generateTournamentBracket(tournamentId);
    }
    findAll() {
        return this.matchesService.findAll();
    }
    findByTournament(tournamentId) {
        return this.matchesService.findByTournament(tournamentId);
    }
    findByTournamentAndRound(tournamentId, round) {
        return this.matchesService.findByTournamentAndRound(tournamentId, +round);
    }
    findByParticipant(participantId) {
        return this.matchesService.findByParticipant(participantId);
    }
    findOne(id) {
        return this.matchesService.findById(id);
    }
    update(id, updateMatchDto) {
        return this.matchesService.update(id, updateMatchDto);
    }
    updateResult(id, updateMatchResultDto) {
        return this.matchesService.updateResult(id, updateMatchResultDto);
    }
    remove(id) {
        return this.matchesService.remove(id);
    }
};
exports.MatchesController = MatchesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'organizer'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new match' }),
    (0, swagger_1.ApiBody)({ type: create_match_dto_1.CreateMatchDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Match created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_match_dto_1.CreateMatchDto]),
    __metadata("design:returntype", void 0)
], MatchesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('tournament/:tournamentId/bracket'),
    (0, roles_decorator_1.Roles)('admin', 'organizer'),
    (0, swagger_1.ApiOperation)({
        summary: 'Generate tournament bracket (auto create matches)',
    }),
    (0, swagger_1.ApiParam)({ name: 'tournamentId', description: 'Tournament ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Bracket generated successfully' }),
    __param(0, (0, common_1.Param)('tournamentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MatchesController.prototype, "generateBracket", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all matches' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all matches' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MatchesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('tournament/:tournamentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get matches by tournament ID' }),
    (0, swagger_1.ApiParam)({ name: 'tournamentId', description: 'Tournament ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Matches for the tournament' }),
    __param(0, (0, common_1.Param)('tournamentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MatchesController.prototype, "findByTournament", null);
__decorate([
    (0, common_1.Get)('tournament/:tournamentId/round/:round'),
    (0, swagger_1.ApiOperation)({ summary: 'Get matches by tournament and round number' }),
    (0, swagger_1.ApiParam)({ name: 'tournamentId', description: 'Tournament ID' }),
    (0, swagger_1.ApiParam)({ name: 'round', description: 'Round number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Matches for specific round' }),
    __param(0, (0, common_1.Param)('tournamentId')),
    __param(1, (0, common_1.Param)('round')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], MatchesController.prototype, "findByTournamentAndRound", null);
__decorate([
    (0, common_1.Get)('participant/:participantId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get matches by participant ID' }),
    (0, swagger_1.ApiParam)({ name: 'participantId', description: 'Participant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Matches for the participant' }),
    __param(0, (0, common_1.Param)('participantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MatchesController.prototype, "findByParticipant", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single match by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Match ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Match details' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MatchesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'organizer'),
    (0, swagger_1.ApiOperation)({ summary: 'Update match scheduled time or status' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Match ID' }),
    (0, swagger_1.ApiBody)({ type: update_match_dto_1.UpdateMatchDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Match updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_match_dto_1.UpdateMatchDto]),
    __metadata("design:returntype", void 0)
], MatchesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':id/result'),
    (0, roles_decorator_1.Roles)('admin', 'organizer'),
    (0, swagger_1.ApiOperation)({ summary: 'Update match result (winner and scores)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Match ID' }),
    (0, swagger_1.ApiBody)({ type: update_match_result_dto_1.UpdateMatchResultDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Match result updated successfully',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_match_result_dto_1.UpdateMatchResultDto]),
    __metadata("design:returntype", void 0)
], MatchesController.prototype, "updateResult", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'organizer'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a scheduled match' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Match ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Match deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MatchesController.prototype, "remove", null);
exports.MatchesController = MatchesController = __decorate([
    (0, swagger_1.ApiTags)('Matches'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('matches'),
    __metadata("design:paramtypes", [matches_service_1.MatchesService])
], MatchesController);
//# sourceMappingURL=matches.controller.js.map