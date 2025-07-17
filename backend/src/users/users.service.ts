import {
    Injectable,
    ConflictException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDataDto } from './dto/create-user-request.dto';
import { LoginDataDto } from './dto/login-request.dto';
import { AuthResponseDataDto, UserDto } from './dto/auth-response.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async register(userData: CreateUserDataDto): Promise<AuthResponseDataDto> {
        console.log('=== User Registration ===');
        console.log('Email:', userData.email);
        console.log('Name:', userData.name);
        console.log('Phone:', userData.phone || 'Not provided');
        console.log('Registration Time:', new Date().toISOString());

        // Check if user already exists
        const existingUser = await this.userRepository.findOne({
            where: { email: userData.email },
        });

        if (existingUser) {
            console.log('❌ User already exists with email:', userData.email);
            throw new ConflictException('User with this email already exists');
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        // Create new user
        const user = this.userRepository.create({
            email: userData.email,
            name: userData.name,
            password: hashedPassword,
            phone: userData.phone,
        });

        // Save user to database
        const savedUser = await this.userRepository.save(user);

        // Generate JWT token
        const payload = {
            sub: savedUser.id,
            email: savedUser.email,
            name: savedUser.name,
        };
        const token = this.jwtService.sign(payload);

        console.log('✅ Registration successful for:', userData.email);
        console.log('Generated User ID:', savedUser.id);
        console.log('Generated Token:', token.substring(0, 20) + '...');
        console.log('========================\n');

        // Return response without password
        const userDto: UserDto = {
            id: savedUser.id,
            email: savedUser.email,
            name: savedUser.name,
            phone: savedUser.phone,
        };

        return {
            token,
            user: userDto,
        };
    }

    async login(loginData: LoginDataDto): Promise<AuthResponseDataDto> {
        console.log('=== User Login ===');
        console.log('Email:', loginData.email);
        console.log('Login Time:', new Date().toISOString());

        // Find user by email
        const user = await this.userRepository.findOne({
            where: { email: loginData.email },
        });

        if (!user) {
            console.log('❌ User not found with email:', loginData.email);
            throw new UnauthorizedException('Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
        if (!isPasswordValid) {
            console.log('❌ Invalid password for user:', loginData.email);
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate JWT token
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };
        const token = this.jwtService.sign(payload);

        console.log('✅ Login successful for:', loginData.email);
        console.log('User ID:', user.id);
        console.log('User Name:', user.name);
        console.log('Generated Token:', token.substring(0, 20) + '...');
        console.log('==================\n');

        // Return response without password
        const userDto: UserDto = {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
        };

        return {
            token,
            user: userDto,
        };
    }

    async findById(id: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }
}
