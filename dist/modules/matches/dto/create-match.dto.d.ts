import { MatchStatus } from '../schemas/match.schema';
export declare class CreateMatchDto {
    tournament: string;
    participant1: string;
    participant2: string;
    scheduledTime?: Date;
    status?: MatchStatus;
    round: number;
    matchNumber: number;
    nextMatch?: string;
}
