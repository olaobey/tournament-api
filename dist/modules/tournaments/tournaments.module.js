"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tournaments_controller_1 = require("./controllers/tournaments.controller");
const tournaments_service_1 = require("./services/tournaments.service");
const tournament_repository_1 = require("./repositories/tournament.repository");
const tournament_schema_1 = require("./schemas/tournament.schema");
let TournamentsModule = class TournamentsModule {
};
exports.TournamentsModule = TournamentsModule;
exports.TournamentsModule = TournamentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: tournament_schema_1.Tournament.name, schema: tournament_schema_1.TournamentSchema },
            ]),
        ],
        controllers: [tournaments_controller_1.TournamentsController],
        providers: [tournaments_service_1.TournamentsService, tournament_repository_1.TournamentRepository],
        exports: [tournaments_service_1.TournamentsService],
    })
], TournamentsModule);
//# sourceMappingURL=tournaments.module.js.map