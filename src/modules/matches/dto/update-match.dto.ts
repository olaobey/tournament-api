import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MatchStatus } from '../schemas/match.schema';

export class UpdateMatchDto {
  @ApiPropertyOptional({
    description: 'Rescheduled match time',
    example: '2025-06-02T15:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  scheduledTime?: Date;

  @ApiPropertyOptional({
    enum: MatchStatus,
    description: 'Updated match status',
  })
  @IsEnum(MatchStatus)
  @IsOptional()
  status?: MatchStatus;
}
