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
exports.TournamentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tournaments_service_1 = require("../services/tournaments.service");
const create_tournament_dto_1 = require("../dto/create-tournament.dto");
const update_tournament_dto_1 = require("../dto/update-tournament.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const tournament_schema_1 = require("../schemas/tournament.schema");
let TournamentsController = class TournamentsController {
    constructor(tournamentsService) {
        this.tournamentsService = tournamentsService;
    }
    create(createTournamentDto, req) {
        return this.tournamentsService.create(createTournamentDto, req.user.id);
    }
    findAll() {
        return this.tournamentsService.findAll();
    }
    findByStatus(status) {
        return this.tournamentsService.findByStatus(status);
    }
    findByUser(req) {
        return this.tournamentsService.findByUser(req.user.id);
    }
    findOne(id) {
        return this.tournamentsService.findById(id);
    }
    update(id, updateTournamentDto) {
        return this.tournamentsService.update(id, updateTournamentDto);
    }
    async incrementParticipants(id) {
        return this.tournamentsService.incrementParticipants(id);
    }
    async decrementParticipants(id) {
        return this.tournamentsService.decrementParticipants(id);
    }
    remove(id) {
        return this.tournamentsService.remove(id);
    }
};
exports.TournamentsController = TournamentsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'organizer'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a tournament' }),
    (0, swagger_1.ApiBody)({ type: create_tournament_dto_1.CreateTournamentDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tournament created successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tournament_dto_1.CreateTournamentDto, Object]),
    __metadata("design:returntype", void 0)
], TournamentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all tournaments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TournamentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('status/:status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get tournaments by status' }),
    __param(0, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TournamentsController.prototype, "findByStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('user'),
    (0, swagger_1.ApiOperation)({ summary: 'Get tournaments created by logged-in user' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TournamentsController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a tournament by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TournamentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'organizer'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a tournament by ID' }),
    (0, swagger_1.ApiBody)({ type: update_tournament_dto_1.UpdateTournamentDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tournament updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tournament_dto_1.UpdateTournamentDto]),
    __metadata("design:returntype", void 0)
], TournamentsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('participants/increment/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Increment participant count by 1' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Participant added' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "incrementParticipants", null);
__decorate([
    (0, common_1.Patch)('participants/decrement/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Decrement participant count by 1' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Participant removed' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "decrementParticipants", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'organizer'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a tournament by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tournament deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TournamentsController.prototype, "remove", null);
exports.TournamentsController = TournamentsController = __decorate([
    (0, swagger_1.ApiTags)('Tournaments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('tournaments'),
    __metadata("design:paramtypes", [tournaments_service_1.TournamentsService])
], TournamentsController);
//# sourceMappingURL=tournaments.controller.js.map