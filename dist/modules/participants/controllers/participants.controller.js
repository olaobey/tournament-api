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
exports.ParticipantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const participants_service_1 = require("../services/participants.service");
const createParticipant_dto_1 = require("../dto/createParticipant.dto");
const updateParticipant_dto_1 = require("../dto/updateParticipant.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
let ParticipantsController = class ParticipantsController {
    constructor(participantsService) {
        this.participantsService = participantsService;
    }
    create(createParticipantDto, req) {
        const userId = req.user?.id;
        return this.participantsService.create(createParticipantDto, userId);
    }
    findAll() {
        return this.participantsService.findAll();
    }
    findByTournament(tournamentId) {
        return this.participantsService.findByTournament(tournamentId);
    }
    findActiveByTournament(tournamentId) {
        return this.participantsService.findActiveByTournament(tournamentId);
    }
    findOne(id) {
        return this.participantsService.findById(id);
    }
    update(id, updateParticipantDto) {
        return this.participantsService.update(id, updateParticipantDto);
    }
    remove(id) {
        return this.participantsService.remove(id);
    }
};
exports.ParticipantsController = ParticipantsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new participant' }),
    (0, swagger_1.ApiBody)({ type: createParticipant_dto_1.CreateParticipantDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Participant registered successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createParticipant_dto_1.CreateParticipantDto, Object]),
    __metadata("design:returntype", void 0)
], ParticipantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all participants' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all participants' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ParticipantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('tournament/:tournamentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all participants by tournament ID' }),
    (0, swagger_1.ApiParam)({ name: 'tournamentId', description: 'Tournament ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of participants for tournament',
    }),
    __param(0, (0, common_1.Param)('tournamentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParticipantsController.prototype, "findByTournament", null);
__decorate([
    (0, common_1.Get)('tournament/:tournamentId/active'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get active (not eliminated) participants by tournament ID',
    }),
    (0, swagger_1.ApiParam)({ name: 'tournamentId', description: 'Tournament ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of active participants' }),
    __param(0, (0, common_1.Param)('tournamentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParticipantsController.prototype, "findActiveByTournament", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a participant by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Participant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Participant details' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParticipantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'organizer'),
    (0, swagger_1.ApiOperation)({ summary: 'Update participant details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Participant ID' }),
    (0, swagger_1.ApiBody)({ type: updateParticipant_dto_1.UpdateParticipantDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Participant updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateParticipant_dto_1.UpdateParticipantDto]),
    __metadata("design:returntype", void 0)
], ParticipantsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'organizer'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a participant' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Participant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Participant deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParticipantsController.prototype, "remove", null);
exports.ParticipantsController = ParticipantsController = __decorate([
    (0, swagger_1.ApiTags)('Participants'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('participants'),
    __metadata("design:paramtypes", [participants_service_1.ParticipantsService])
], ParticipantsController);
//# sourceMappingURL=participants.controller.js.map