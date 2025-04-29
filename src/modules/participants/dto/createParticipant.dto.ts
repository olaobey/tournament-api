import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateParticipantDto {
  @ApiProperty({
    description: 'Participant full name',
    example: 'Lionel Messi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Short description of participant',
    example: 'Professional football player',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Contact email',
    example: 'messi@example.com',
  })
  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @ApiProperty({
    description: 'Tournament ID',
    example: '660e2b123456789abcde0001',
  })
  @IsMongoId()
  @IsNotEmpty()
  tournament: string;
}
