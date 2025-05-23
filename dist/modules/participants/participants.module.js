"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const participants_controller_1 = require("./controllers/participants.controller");
const participants_service_1 = require("./services/participants.service");
const participant_repository_1 = require("./repositories/participant.repository");
const participant_schema_1 = require("./schemas/participant.schema");
const tournaments_module_1 = require("../tournaments/tournaments.module");
let ParticipantsModule = class ParticipantsModule {
};
exports.ParticipantsModule = ParticipantsModule;
exports.ParticipantsModule = ParticipantsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: participant_schema_1.Participant.name, schema: participant_schema_1.ParticipantSchema },
            ]),
            (0, common_1.forwardRef)(() => tournaments_module_1.TournamentsModule),
        ],
        controllers: [participants_controller_1.ParticipantsController],
        providers: [participants_service_1.ParticipantsService, participant_repository_1.ParticipantRepository],
        exports: [participants_service_1.ParticipantsService],
    })
], ParticipantsModule);
//# sourceMappingURL=participants.module.js.map