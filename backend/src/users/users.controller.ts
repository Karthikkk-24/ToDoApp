import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { BaseResponseDto } from '../common/dto/base-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({
        status: 201,
        description: 'User successfully registered',
        type: AuthResponseDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request - validation errors',
    })
    register(@Body() request: CreateUserRequestDto): BaseResponseDto {
        try {
            const authData = this.usersService.register(request.data);
            return BaseResponseDto.success(
                authData,
                'User registered successfully',
                request.correlationId,
            );
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Registration error:', errorMessage);
            return BaseResponseDto.error(
                'Registration failed',
                [errorMessage],
                request.correlationId,
            );
        }
    }

    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({
        status: 200,
        description: 'User successfully logged in',
        type: AuthResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized - invalid credentials',
    })
    login(@Body() request: LoginRequestDto): BaseResponseDto {
        try {
            const authData = this.usersService.login(request.data);
            return BaseResponseDto.success(authData, 'Login successful', request.correlationId);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Login error:', errorMessage);
            return BaseResponseDto.error('Login failed', [errorMessage], request.correlationId);
        }
    }
}
