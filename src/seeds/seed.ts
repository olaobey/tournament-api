import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from '../app.module';
import { UsersService } from '../modules/users/services/users.service';
import { TournamentsService } from '../modules/tournaments/services/tournaments.service';
import { ParticipantsService } from '../modules/participants/services/participants.service';
import { TournamentStatus } from '../modules/tournaments/schemas/tournament.schema';
import * as bcrypt from 'bcryptjs';

async function bootstrap() {
  const logger = new Logger('Seed');
  logger.log('Starting database seeding...');

  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);
  const tournamentsService = app.get(TournamentsService);
  const participantsService = app.get(ParticipantsService);

  try {
    // Seed admin user
    const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminUser = await usersService.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      roles: ['admin', 'organizer'],
    });

    logger.log(`Admin user created with ID: ${adminUser._id}`);

    // Seed organizer user
    const organizerUser = await usersService.create({
      name: 'Tournament Organizer',
      email: 'organizer@example.com',
      password: 'admin123',
      roles: ['organizer'],
    });

    logger.log(`Organizer user created with ID: ${organizerUser._id}`);

    // Seed regular user
    const regularUser = await usersService.create({
      name: 'Regular User',
      email: 'user@example.com',
      password: 'admin123',
      roles: ['user'],
    });

    logger.log(`Regular user created with ID: ${regularUser._id}`);

    // Seed tournament
    const tournament = await tournamentsService.create(
      {
        name: 'FIFA World Cup 2026',
        description:
          "The 23rd FIFA World Cup, a quadrennial international men's soccer tournament.",
        maxParticipants: 8,
        status: TournamentStatus.REGISTRATION,
        startDate: new Date('2026-06-10'),
        endDate: new Date('2026-07-10'),
      },
      adminUser._id.toString(),
    );

    logger.log(`Tournament created with ID: ${tournament._id}`);

    // Seed participants
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
      const participant = await participantsService.create(
        {
          name: team,
          description: `National team of ${team}`,
          contactEmail: `${team.toLowerCase()}@example.com`,
          tournament: tournament._id.toString(),
        },
        adminUser._id.toString(),
      );

      logger.log(`Participant ${team} created with ID: ${participant._id}`);
    }

    logger.log('Seeding completed successfully');
  } catch (error) {
    logger.error('Error seeding database:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
