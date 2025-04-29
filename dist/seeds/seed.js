"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("../app.module");
const users_service_1 = require("../modules/users/services/users.service");
const tournaments_service_1 = require("../modules/tournaments/services/tournaments.service");
const participants_service_1 = require("../modules/participants/services/participants.service");
const tournament_schema_1 = require("../modules/tournaments/schemas/tournament.schema");
const bcrypt = require("bcryptjs");
async function bootstrap() {
    const logger = new common_1.Logger('Seed');
    logger.log('Starting database seeding...');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    const tournamentsService = app.get(tournaments_service_1.TournamentsService);
    const participantsService = app.get(participants_service_1.ParticipantsService);
    try {
        const salt = await bcrypt.genSalt();
        const adminUser = await usersService.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123',
            roles: ['admin', 'organizer'],
        });
        logger.log(`Admin user created with ID: ${adminUser._id}`);
        const organizerUser = await usersService.create({
            name: 'Tournament Organizer',
            email: 'organizer@example.com',
            password: 'admin123',
            roles: ['organizer'],
        });
        logger.log(`Organizer user created with ID: ${organizerUser._id}`);
        const regularUser = await usersService.create({
            name: 'Regular User',
            email: 'user@example.com',
            password: 'admin123',
            roles: ['user'],
        });
        logger.log(`Regular user created with ID: ${regularUser._id}`);
        const tournament = await tournamentsService.create({
            name: 'FIFA World Cup 2026',
            description: "The 23rd FIFA World Cup, a quadrennial international men's soccer tournament.",
            maxParticipants: 8,
            status: tournament_schema_1.TournamentStatus.REGISTRATION,
            startDate: new Date('2026-06-10'),
            endDate: new Date('2026-07-10'),
        }, adminUser._id.toString());
        logger.log(`Tournament created with ID: ${tournament._id}`);
        const teams = [
            'Brazil',
            'France',
            'Argentina',
            'Spain',
            'Germany',
            'England',
            'Italy',
            'Portugal',
        ];
        for (const team of teams) {
            const participant = await participantsService.create({
                name: team,
                description: `National team of ${team}`,
                contactEmail: `${team.toLowerCase()}@example.com`,
                tournament: tournament._id.toString(),
            }, adminUser._id.toString());
            logger.log(`Participant ${team} created with ID: ${participant._id}`);
        }
        logger.log('Seeding completed successfully');
    }
    catch (error) {
        logger.error('Error seeding database:', error);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=seed.js.map