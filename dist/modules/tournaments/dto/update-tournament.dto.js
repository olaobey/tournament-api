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
exports.UpdateTournamentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const tournament_schema_1 = require("../schemas/tournament.schema");
const power_validator_1 = require("../../../common/validators/power.validator");
class UpdateTournamentDto {
}
exports.UpdateTournamentDto = UpdateTournamentDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Updated Tournament Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTournamentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Updated description of the tournament' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTournamentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 8,
        description: 'Max number of participants',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Validate)(power_validator_1.IsPowerOfTwo, {
        message: 'maxParticipants must be a power of 2 (e.g., 2, 4, 8, 16, 32, 64, etc.)',
    }),
    __metadata("design:type", Number)
], UpdateTournamentDto.prototype, "maxParticipants", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: tournament_schema_1.TournamentStatus.ONGOING,
        enum: tournament_schema_1.TournamentStatus,
        description: 'Current status of the tournament',
    }),
    (0, class_validator_1.IsEnum)(tournament_schema_1.TournamentStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTournamentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-07-01T00:00:00.000Z' }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateTournamentDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-07-05T00:00:00.000Z' }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateTournamentDto.prototype, "endDate", void 0);
//# sourceMappingURL=update-tournament.dto.js.map