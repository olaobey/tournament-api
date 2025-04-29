import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipantsController } from './controllers/participants.controller';
import { ParticipantsService } from './services/participants.service';
import { ParticipantRepository } from './repositories/participant.repository';
import { Participant, ParticipantSchema } from './schemas/participant.schema';
import { TournamentsModule } from '../tournaments/tournaments.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Participant.name, schema: ParticipantSchema },
    ]),
    forwardRef(() => TournamentsModule),
  ],
  controllers: [ParticipantsController],
  providers: [ParticipantsService, ParticipantRepository],
  exports: [ParticipantsService],
})
export class ParticipantsModule {}
