import { Injectable } from '@nestjs/common';
import { CreateUserDataDto } from './dto/create-user-request.dto';
import { LoginDataDto } from './dto/login-request.dto';
import { AuthResponseDataDto, UserDto } from './dto/auth-response.dto';

@Injectable()
export class UsersService {
    register(userData: CreateUserDataDto): AuthResponseDataDto {
        // Log the registration data to console
        console.log('=== User Registration ===');
        console.log('Email:', userData.email);
        console.log('Name:', userData.name);
        console.log('Password:', userData.password);
        console.log('Phone:', userData.phone || 'Not provided');
        console.log('Registration Time:', new Date().toISOString());
        console.log('========================\n');

        // Create mock user response
        const user: UserDto = {
            id: Math.random().toString(36).substr(2, 9), // Generate random ID
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
        };

        // Create mock token
        const token = 'mock_token_' + Math.random().toString(36).substr(2, 20);

        return {
            token,
            user,
        };
    }

    login(loginData: LoginDataDto): AuthResponseDataDto {
        // Log the login data to console
        console.log('=== User Login ===');
        console.log('Email:', loginData.email);
        console.log('Password:', loginData.password);
        console.log('Login Time:', new Date().toISOString());
        console.log('==================\n');

        // Create mock user response (in real app, you'd validate credentials first)
        const user: UserDto = {
            id: Math.random().toString(36).substr(2, 9), // Generate random ID
            email: loginData.email,
            name: loginData.email.split('@')[0], // Use email prefix as name
            phone: undefined,
        };

        // Create mock token
        const token = 'mock_token_' + Math.random().toString(36).substr(2, 20);

        return {
            token,
            user,
        };
    }
}
