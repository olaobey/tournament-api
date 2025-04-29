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
exports.CreateMatchDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const match_schema_1 = require("../schemas/match.schema");
class CreateMatchDto {
}
exports.CreateMatchDto = CreateMatchDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tournament ID',
        example: '660e2b123456789abcde0001',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMatchDto.prototype, "tournament", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Participant 1 ID',
        example: '660e2b123456789abcde0002',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMatchDto.prototype, "participant1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Participant 2 ID',
        example: '660e2b123456789abcde0003',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMatchDto.prototype, "participant2", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Scheduled match time',
        example: '2025-06-01T10:00:00Z',
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateMatchDto.prototype, "scheduledTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: match_schema_1.MatchStatus, description: 'Match status' }),
    (0, class_validator_1.IsEnum)(match_schema_1.MatchStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMatchDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Round number (1=First round)', example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateMatchDto.prototype, "round", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Match number within the round', example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateMatchDto.prototype, "matchNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Next match ID where the winner progresses',
        example: '660e2b123456789abcde0004',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMatchDto.prototype, "nextMatch", void 0);
//# sourceMappingURL=create-match.dto.js.map