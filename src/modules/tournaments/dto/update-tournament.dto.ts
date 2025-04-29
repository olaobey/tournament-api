import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TournamentStatus } from '../schemas/tournament.schema';
import { IsPowerOfTwo } from '../../../common/validators/power.validator';

export class UpdateTournamentDto {
  @ApiPropertyOptional({ example: 'Updated Tournament Name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Updated description of the tournament' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 8,
    description: 'Max number of participants',
  })
  @IsInt()
  @Min(2)
  @IsPositive()
  @IsOptional()
  @Validate(IsPowerOfTwo, {
    message:
      'maxParticipants must be a power of 2 (e.g., 2, 4, 8, 16, 32, 64, etc.)',
  })
  maxParticipants?: number;

  @ApiPropertyOptional({
    example: TournamentStatus.ONGOING,
    enum: TournamentStatus,
    description: 'Current status of the tournament',
  })
  @IsEnum(TournamentStatus)
  @IsOptional()
  status?: TournamentStatus;

  @ApiPropertyOptional({ example: '2025-07-01T00:00:00.000Z' })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({ example: '2025-07-05T00:00:00.000Z' })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;
}
