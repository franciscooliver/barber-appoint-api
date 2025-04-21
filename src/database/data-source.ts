import { Address } from "@modules/addresses/entities/address.entity";
import { Appointment } from "@modules/appointments/entities/appointment.entity";
import { TokenBlacklist } from "@modules/auth/entities/token-blacklist.entity";
import { Barbershop } from "@modules/barbershops/entities/barbershop.entity";
import { Collaborator } from "@modules/collaborators/entities/collaborator.entity";
import { Service } from "@modules/services/entities/service.entity";
import { User } from "@modules/users/entities/user.entity";
import { DataSource } from "typeorm";
import { config } from 'dotenv';
import { Settings } from "@modules/settings/entities/settings.entity";

config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        Address, 
        User, 
        TokenBlacklist, 
        Collaborator, 
        Barbershop, 
        Service, 
        Appointment,
        Settings
    ],
    synchronize: true,
    extra: {
        poolSize: 20,
        connectionTimeoutMillis: 10000,
        query_timeout: 10000,
        statement_timeout: 10000,
        max: 20,
        connectionRetryAttempts: 5,
        connectionRetryDelay: 3000,
    },
});
