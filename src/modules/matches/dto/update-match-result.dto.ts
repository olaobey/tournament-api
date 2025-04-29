import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsNotEmpty, Min } from 'class-validator';

export class UpdateMatchResultDto {
  @ApiProperty({ description: 'Participant 1 score', example: 3 })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  participant1Score: number;

  @ApiProperty({ description: 'Participant 2 score', example: 1 })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  participant2Score: number;

  @ApiProperty({
    description: 'Winner Participant ID',
    example: '660e2b123456789abcde0002',
  })
  @IsMongoId()
  @IsNotEmpty()
  winner: string;
}
