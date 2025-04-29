import { TournamentStatus } from '../schemas/tournament.schema';
export declare class CreateTournamentDto {
    name: string;
    description?: string;
    maxParticipants: number;
    status?: TournamentStatus;
    startDate?: Date;
    endDate?: Date;
}
