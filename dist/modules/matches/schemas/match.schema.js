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
exports.MatchSchema = exports.Match = exports.MatchStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var MatchStatus;
(function (MatchStatus) {
    MatchStatus["SCHEDULED"] = "scheduled";
    MatchStatus["IN_PROGRESS"] = "in_progress";
    MatchStatus["COMPLETED"] = "completed";
})(MatchStatus || (exports.MatchStatus = MatchStatus = {}));
let Match = class Match {
};
exports.Match = Match;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true,
    }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Match.prototype, "tournament", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Participant',
    }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Match.prototype, "participant1", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Participant',
    }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Match.prototype, "participant2", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Participant' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Match.prototype, "winner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Match.prototype, "participant1Score", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Match.prototype, "participant2Score", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Match.prototype, "scheduledTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(MatchStatus),
        default: MatchStatus.SCHEDULED,
    }),
    __metadata("design:type", String)
], Match.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Match.prototype, "round", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Match.prototype, "matchNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Match' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Match.prototype, "nextMatch", void 0);
exports.Match = Match = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Match);
exports.MatchSchema = mongoose_1.SchemaFactory.createForClass(Match);
//# sourceMappingURL=match.schema.js.map