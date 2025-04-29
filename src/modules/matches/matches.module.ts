import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchesController } from './controllers/matches.controller';
import { MatchesService } from './services/matches.service';
import { MatchRepository } from './repositories/match.repository';
import { Match, MatchSchema } from './schemas/match.schema';
import { TournamentsModule } from '../tournaments/tournaments.module';
import { ParticipantsModule } from '../participants/participants.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Match.name, schema: MatchSchema }]),
    forwardRef(() => TournamentsModule),
    forwardRef(() => ParticipantsModule),
  ],
  controllers: [MatchesController],
  providers: [MatchesService, MatchRepository],
  exports: [MatchesService],
})
export class MatchesModule {}
