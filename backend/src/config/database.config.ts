import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Task } from '../tasks/entities/task.entity';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'todoapp.db',
    entities: [User, Task],
    synchronize: true,
    logging: true,
};

// For production, use PostgreSQL:
// export const databaseConfig: TypeOrmModuleOptions = {
//     type: 'postgres',
//     host: process.env.DB_HOST || 'localhost',
//     port: parseInt(process.env.DB_PORT || '5432'),
//     username: process.env.DB_USERNAME || 'postgres',
//     password: process.env.DB_PASSWORD || 'password',
//     database: process.env.DB_NAME || 'todoapp',
//     entities: [User, Task],
//     synchronize: true,
//     logging: true,
//     ssl: false,
// };
