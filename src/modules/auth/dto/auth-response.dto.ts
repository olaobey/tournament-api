import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'jwt.token.here' })
  access_token: string;

  @ApiProperty({
    example: {
      id: '64fa8b7be8761c001faed450',
      name: 'John Doe',
      email: 'john@example.com',
      roles: ['admin'],
    },
  })
  user: {
    id: string;
    name: string;
    email: string;
    roles: string[];
  };
}
