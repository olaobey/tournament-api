import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MatchStatus } from '../schemas/match.schema';

export class CreateMatchDto {
  @ApiProperty({
    description: 'Tournament ID',
    example: '660e2b123456789abcde0001',
  })
  @IsMongoId()
  @IsNotEmpty()
  tournament: string;

  @ApiProperty({
    description: 'Participant 1 ID',
    example: '660e2b123456789abcde0002',
  })
  @IsMongoId()
  @IsNotEmpty()
  participant1: string;

  @ApiProperty({
    description: 'Participant 2 ID',
    example: '660e2b123456789abcde0003',
  })
  @IsMongoId()
  @IsNotEmpty()
  participant2: string;

  @ApiPropertyOptional({
    description: 'Scheduled match time',
    example: '2025-06-01T10:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  scheduledTime?: Date;

  @ApiPropertyOptional({ enum: MatchStatus, description: 'Match status' })
  @IsEnum(MatchStatus)
  @IsOptional()
  status?: MatchStatus;

  @ApiProperty({ description: 'Round number (1=First round)', example: 1 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  round: number;

  @ApiProperty({ description: 'Match number within the round', example: 1 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  matchNumber: number;

  @ApiPropertyOptional({
    description: 'Next match ID where the winner progresses',
    example: '660e2b123456789abcde0004',
  })
  @IsMongoId()
  @IsOptional()
  nextMatch?: string;
}
