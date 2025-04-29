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
exports.CreateTournamentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const tournament_schema_1 = require("../schemas/tournament.schema");
const power_validator_1 = require("../../../common/validators/power.validator");
class CreateTournamentDto {
}
exports.CreateTournamentDto = CreateTournamentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Champions Cup', description: 'Tournament name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTournamentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Single elimination football tournament',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTournamentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 16,
        description: 'Maximum participants (minimum: 2)',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Validate)(power_validator_1.IsPowerOfTwo, {
        message: 'maxParticipants must be a power of 2 (e.g., 2, 4, 8, 16, 32, 64, etc.)',
    }),
    __metadata("design:type", Number)
], CreateTournamentDto.prototype, "maxParticipants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: tournament_schema_1.TournamentStatus.DRAFT,
        enum: tournament_schema_1.TournamentStatus,
        required: false,
    }),
    (0, class_validator_1.IsEnum)(tournament_schema_1.TournamentStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTournamentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-01T00:00:00.000Z', required: false }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateTournamentDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-10T00:00:00.000Z', required: false }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateTournamentDto.prototype, "endDate", void 0);
//# sourceMappingURL=create-tournament.dto.js.map