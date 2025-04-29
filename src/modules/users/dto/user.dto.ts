import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'securePassword123', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: ['admin'],
    required: false,
    description: 'Array of user roles',
  })
  @IsOptional()
  @IsString({ each: true })
  roles?: string[];
}

export class UpdateUserDto {
  @ApiProperty({ example: 'Jane Doe', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'janedoe@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'newSecurePassword123', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ example: ['user'], required: false })
  @IsOptional()
  @IsString({ each: true })
  roles?: string[];
}
