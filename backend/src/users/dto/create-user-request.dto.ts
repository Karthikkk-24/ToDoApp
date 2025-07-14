import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { BaseRequestDto } from '../../common/dto/base-request.dto';

export class CreateUserDataDto {
    @ApiProperty({
        description: 'User email address',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        description: 'User full name',
        example: 'John Doe',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly name: string;

    @ApiProperty({
        description: 'User password',
        example: 'SecurePass123!',
        minLength: 8,
    })
    @IsString()
    @MinLength(8)
    @MaxLength(128)
    readonly password: string;

    @ApiProperty({
        description: 'User phone number',
        example: '+1234567890',
        required: false,
    })
    @IsOptional()
    @IsString()
    readonly phone?: string;
}

export class CreateUserRequestDto extends BaseRequestDto {
    @ApiProperty({
        description: 'User creation data',
        type: CreateUserDataDto,
    })
    readonly data: CreateUserDataDto;
}

// user/dto/update-user-request.dto.ts
export class UpdateUserDataDto {
    @ApiProperty({
        description: 'User full name',
        example: 'John Doe Updated',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly name?: string;

    @ApiProperty({
        description: 'User phone number',
        example: '+1234567890',
        required: false,
    })
    @IsOptional()
    @IsString()
    readonly phone?: string;
}

export class UpdateUserRequestDto extends BaseRequestDto {
    @ApiProperty({
        description: 'User update data',
        type: UpdateUserDataDto,
    })
    readonly data: UpdateUserDataDto;
}
