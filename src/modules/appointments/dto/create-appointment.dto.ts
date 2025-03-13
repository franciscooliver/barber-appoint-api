import { IsNotEmpty, IsDateString, IsString, IsNumber, IsObject } from 'class-validator';
import { Service } from '@modules/services/entities/service.entity';
import { User } from '@modules/users/entities/user.entity';
import { Barbershop } from '@modules/barbershops/entities/barbershop.entity';

export class CreateAppointmentDto {
    user?: User;

    @IsNotEmpty()
    @IsObject()
    barbershop: Barbershop;

    @IsNotEmpty()
    @IsObject()
    service: Service; // O serviço agora é uma string

    @IsNotEmpty()
    @IsDateString()
    appointmentDate: string;

    @IsString()
    time: string;

    @IsString()
    status?: string;
}
