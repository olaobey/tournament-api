import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TournamentStatus } from '../schemas/tournament.schema';
import { IsPowerOfTwo } from '../../../common/validators/power.validator';

export class CreateTournamentDto {
  @ApiProperty({ example: 'Champions Cup', description: 'Tournament name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Single elimination football tournament',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 16,
    description: 'Maximum participants (minimum: 2)',
  })
  @IsInt()
  @Min(2)
  @IsPositive()
  @Validate(IsPowerOfTwo, {
    message:
      'maxParticipants must be a power of 2 (e.g., 2, 4, 8, 16, 32, 64, etc.)',
  })
  maxParticipants: number;

  @ApiProperty({
    example: TournamentStatus.DRAFT,
    enum: TournamentStatus,
    required: false,
  })
  @IsEnum(TournamentStatus)
  @IsOptional()
  status?: TournamentStatus;

  @ApiProperty({ example: '2025-06-01T00:00:00.000Z', required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @ApiProperty({ example: '2025-06-10T00:00:00.000Z', required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;
}
