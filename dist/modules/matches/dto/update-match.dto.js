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
exports.UpdateMatchDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const match_schema_1 = require("../schemas/match.schema");
class UpdateMatchDto {
}
exports.UpdateMatchDto = UpdateMatchDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Rescheduled match time',
        example: '2025-06-02T15:00:00Z',
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateMatchDto.prototype, "scheduledTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: match_schema_1.MatchStatus,
        description: 'Updated match status',
    }),
    (0, class_validator_1.IsEnum)(match_schema_1.MatchStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMatchDto.prototype, "status", void 0);
//# sourceMappingURL=update-match.dto.js.map