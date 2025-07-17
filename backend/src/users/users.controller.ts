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
            console.log('\n🔹 REGISTRATION REQUEST RECEIVED 🔹');
            console.log('Correlation ID:', request.correlationId);
            console.log('Request Data:', {
                email: request.data.email,
                name: request.data.name,
                phone: request.data.phone || 'Not provided',
                timestamp: new Date().toISOString(),
            });

            const authData = this.usersService.register(request.data);

            console.log('✅ Registration successful for:', request.data.email);
            console.log('Generated User ID:', authData.user.id);
            console.log('Generated Token:', authData.token.substring(0, 20) + '...');
            console.log('🔹 END REGISTRATION 🔹\n');

            return BaseResponseDto.success(
                authData,
                'User registered successfully',
                request.correlationId,
            );
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('❌ Registration error for:', request.data?.email || 'unknown');
            console.error('Error details:', errorMessage);
            console.error('Correlation ID:', request.correlationId);
            console.error('🔹 END REGISTRATION ERROR 🔹\n');

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
            console.log('\n🔸 LOGIN REQUEST RECEIVED 🔸');
            console.log('Correlation ID:', request.correlationId);
            console.log('Request Data:', {
                email: request.data.email,
                passwordProvided: !!request.data.password,
                timestamp: new Date().toISOString(),
            });

            const authData = this.usersService.login(request.data);

            console.log('✅ Login successful for:', request.data.email);
            console.log('User ID:', authData.user.id);
            console.log('User Name:', authData.user.name);
            console.log('Generated Token:', authData.token.substring(0, 20) + '...');
            console.log('🔸 END LOGIN 🔸\n');

            return BaseResponseDto.success(authData, 'Login successful', request.correlationId);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('❌ Login error for:', request.data?.email || 'unknown');
            console.error('Error details:', errorMessage);
            console.error('Correlation ID:', request.correlationId);
            console.error('🔸 END LOGIN ERROR 🔸\n');

            return BaseResponseDto.error('Login failed', [errorMessage], request.correlationId);
        }
    }
}
