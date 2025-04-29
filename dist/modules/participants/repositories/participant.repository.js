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
exports.ParticipantRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const participant_schema_1 = require("../schemas/participant.schema");
let ParticipantRepository = class ParticipantRepository {
    constructor(participantModel) {
        this.participantModel = participantModel;
    }
    async create(createParticipantDto, userId) {
        const createdParticipant = new this.participantModel({
            ...createParticipantDto,
            registeredBy: userId,
        });
        return createdParticipant.save();
    }
    async findAll() {
        return this.participantModel.find().exec();
    }
    async findById(id) {
        return this.participantModel.findById(id).exec();
    }
    async findByTournament(tournamentId) {
        return this.participantModel.find({ tournament: tournamentId }).exec();
    }
    async findActiveByTournament(tournamentId) {
        return this.participantModel
            .find({ tournament: tournamentId, eliminated: false })
            .exec();
    }
    async update(id, updateParticipantDto) {
        return this.participantModel
            .findByIdAndUpdate(id, updateParticipantDto, { new: true })
            .exec();
    }
    async incrementWins(id) {
        return this.participantModel
            .findByIdAndUpdate(id, { $inc: { wins: 1 } }, { new: true })
            .exec();
    }
    async incrementLosses(id) {
        return this.participantModel
            .findByIdAndUpdate(id, { $inc: { losses: 1 }, eliminated: true }, { new: true })
            .exec();
    }
    async remove(id) {
        return this.participantModel.findByIdAndDelete(id).exec();
    }
    async removeByTournament(tournamentId) {
        return this.participantModel
            .deleteMany({ tournament: tournamentId })
            .exec();
    }
};
exports.ParticipantRepository = ParticipantRepository;
exports.ParticipantRepository = ParticipantRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(participant_schema_1.Participant.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ParticipantRepository);
//# sourceMappingURL=participant.repository.js.map