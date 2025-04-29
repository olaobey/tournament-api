import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TournamentsController } from './controllers/tournaments.controller';
import { TournamentsService } from './services/tournaments.service';
import { TournamentRepository } from './repositories/tournament.repository';
import { Tournament, TournamentSchema } from './schemas/tournament.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tournament.name, schema: TournamentSchema },
    ]),
  ],
  controllers: [TournamentsController],
  providers: [TournamentsService, TournamentRepository],
  exports: [TournamentsService],
})
export class TournamentsModule {}
