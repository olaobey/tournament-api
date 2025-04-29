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
exports.TournamentSchema = exports.Tournament = exports.TournamentStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var TournamentStatus;
(function (TournamentStatus) {
    TournamentStatus["DRAFT"] = "draft";
    TournamentStatus["REGISTRATION"] = "registration";
    TournamentStatus["ONGOING"] = "ongoing";
    TournamentStatus["COMPLETED"] = "completed";
})(TournamentStatus || (exports.TournamentStatus = TournamentStatus = {}));
let Tournament = class Tournament {
};
exports.Tournament = Tournament;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Tournament.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tournament.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Tournament.prototype, "maxParticipants", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Tournament.prototype, "currentParticipants", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(TournamentStatus),
        default: TournamentStatus.DRAFT,
    }),
    __metadata("design:type", String)
], Tournament.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Tournament.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Tournament.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Tournament.prototype, "createdBy", void 0);
exports.Tournament = Tournament = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Tournament);
exports.TournamentSchema = mongoose_1.SchemaFactory.createForClass(Tournament);
//# sourceMappingURL=tournament.schema.js.map