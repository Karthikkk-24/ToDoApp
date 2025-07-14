import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { BaseRequestDto } from '../../common/dto/base-request.dto';

export class LoginDataDto {
    @ApiProperty({
        description: 'User email address',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        description: 'User password',
        example: 'SecurePass123!',
        minLength: 8,
    })
    @IsString()
    @MinLength(8)
    @MaxLength(128)
    readonly password: string;
}

export class LoginRequestDto extends BaseRequestDto {
    @ApiProperty({
        description: 'User login credentials',
        type: LoginDataDto,
    })
    readonly data: LoginDataDto;
}
