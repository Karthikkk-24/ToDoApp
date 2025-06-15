import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class BaseRequestDto {
  @ApiProperty({
    description: 'CSRF token for request authentication',
    example: 'abc123-def456-ghi789',
  })
  @IsString()
  @IsNotEmpty()
  readonly csrfToken: string;

  @ApiProperty({
    description: 'Request correlation ID for tracking',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  readonly correlationId?: string;

  @ApiProperty({
    description: 'Client timestamp',
    example: '2025-06-15T10:30:00Z',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly timestamp?: string;
}
