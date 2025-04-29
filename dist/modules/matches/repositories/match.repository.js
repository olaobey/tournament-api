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
exports.MatchRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const match_schema_1 = require("../schemas/match.schema");
let MatchRepository = class MatchRepository {
    constructor(matchModel) {
        this.matchModel = matchModel;
    }
    async create(createMatchDto) {
        const createdMatch = new this.matchModel(createMatchDto);
        return createdMatch.save();
    }
    async findAll() {
        return this.matchModel.find().exec();
    }
    async findById(id) {
        return this.matchModel.findById(id).exec();
    }
    async findByTournament(tournamentId) {
        return this.matchModel.find({ tournament: tournamentId }).exec();
    }
    async findByTournamentAndRound(tournamentId, round) {
        return this.matchModel.find({ tournament: tournamentId, round }).exec();
    }
    async findByParticipant(participantId) {
        return this.matchModel
            .find({
            $or: [{ participant1: participantId }, { participant2: participantId }],
        })
            .exec();
    }
    async findByStatus(status) {
        return this.matchModel.find({ status }).exec();
    }
    async update(id, updateMatchDto) {
        return this.matchModel
            .findByIdAndUpdate(id, updateMatchDto, { new: true })
            .exec();
    }
    async updateResult(id, updateMatchResultDto) {
        return this.matchModel
            .findByIdAndUpdate(id, {
            participant1Score: updateMatchResultDto.participant1Score,
            participant2Score: updateMatchResultDto.participant2Score,
            winner: updateMatchResultDto.winner,
            status: match_schema_1.MatchStatus.COMPLETED,
        }, { new: true })
            .exec();
    }
    async updateParticipantInNextMatch(matchId, nextMatchId, isFirstParticipant, winnerId) {
        const updateField = isFirstParticipant
            ? { participant1: winnerId }
            : { participant2: winnerId };
        return this.matchModel
            .findByIdAndUpdate(nextMatchId, updateField, { new: true })
            .exec();
    }
    async remove(id) {
        return this.matchModel.findByIdAndDelete(id).exec();
    }
    async removeByTournament(tournamentId) {
        return this.matchModel.deleteMany({ tournament: tournamentId }).exec();
    }
};
exports.MatchRepository = MatchRepository;
exports.MatchRepository = MatchRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(match_schema_1.Match.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MatchRepository);
//# sourceMappingURL=match.repository.js.map