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
exports.TournamentRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tournament_schema_1 = require("../schemas/tournament.schema");
let TournamentRepository = class TournamentRepository {
    constructor(tournamentModel) {
        this.tournamentModel = tournamentModel;
    }
    async create(createTournamentDto, userId) {
        const createdTournament = new this.tournamentModel({
            ...createTournamentDto,
            createdBy: userId,
            currentParticipants: 0,
        });
        return createdTournament.save();
    }
    async findAll() {
        return this.tournamentModel.find().exec();
    }
    async findById(id) {
        return this.tournamentModel.findById(id).exec();
    }
    async findByStatus(status) {
        return this.tournamentModel.find({ status }).exec();
    }
    async findByUser(userId) {
        return this.tournamentModel.find({ createdBy: userId }).exec();
    }
    async update(id, updateTournamentDto) {
        return this.tournamentModel
            .findByIdAndUpdate(id, updateTournamentDto, { new: true })
            .exec();
    }
    async incrementParticipants(id) {
        return this.tournamentModel
            .findByIdAndUpdate(id, { $inc: { currentParticipants: 1 } }, { new: true })
            .exec();
    }
    async decrementParticipants(id) {
        return this.tournamentModel
            .findByIdAndUpdate(id, { $inc: { currentParticipants: -1 } }, { new: true })
            .exec();
    }
    async remove(id) {
        return this.tournamentModel.findByIdAndDelete(id).exec();
    }
};
exports.TournamentRepository = TournamentRepository;
exports.TournamentRepository = TournamentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tournament_schema_1.Tournament.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TournamentRepository);
//# sourceMappingURL=tournament.repository.js.map