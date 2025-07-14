import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../../common/dto/base-response.dto';

export class UserDto {
    @ApiProperty({
        description: 'User ID',
        example: '12345',
    })
    readonly id: string;

    @ApiProperty({
        description: 'User email address',
        example: 'john.doe@example.com',
    })
    readonly email: string;

    @ApiProperty({
        description: 'User full name',
        example: 'John Doe',
    })
    readonly name: string;

    @ApiProperty({
        description: 'User phone number',
        example: '+1234567890',
        required: false,
    })
    readonly phone?: string;
}

export class AuthResponseDataDto {
    @ApiProperty({
        description: 'Authentication token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    readonly token: string;

    @ApiProperty({
        description: 'User information',
        type: UserDto,
    })
    readonly user: UserDto;
}

export class AuthResponseDto extends BaseResponseDto<AuthResponseDataDto> {
    @ApiProperty({
        description: 'Authentication response data',
        type: AuthResponseDataDto,
    })
    declare readonly data: AuthResponseDataDto;
}
