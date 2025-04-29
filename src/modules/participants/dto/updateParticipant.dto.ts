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

export class UpdateParticipantDto {
  @ApiPropertyOptional({
    description: 'Updated participant name',
    example: 'Cristiano Ronaldo',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated description',
    example: 'World-class athlete',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Updated contact email',
    example: 'ronaldo@example.com',
  })
  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @ApiPropertyOptional({ description: 'Elimination status', example: true })
  @IsBoolean()
  @IsOptional()
  eliminated?: boolean;
}
