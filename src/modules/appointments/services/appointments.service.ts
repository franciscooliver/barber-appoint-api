import { ClassSerializerInterceptor, Injectable, UseInterceptors } from '@nestjs/common';
import { Appointment } from '@modules/appointments/entities/appointment.entity';
import { CreateAppointmentDto } from '@modules/appointments/dto/create-appointment.dto';
import { UpdateAppointmentDto } from '@modules/appointments/dto/update-appointment.dto';
import { AppointmentRepository } from '@modules/appointments/repositories/appointment.repository';
import { BarbershopsRepository } from '@modules/barbershops/repositories/barbershops.repository';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { ServicesRepository } from '@modules/services/repositories/service.repository';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class AppointmentsService {
    constructor(
        private readonly repositoty: AppointmentRepository,
        private readonly barbershopRepository: BarbershopsRepository,
        private readonly userRepository: UsersRepository,
        private readonly servicesRepository: ServicesRepository,
    ) {}

    async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
        const babershops = await this.barbershopRepository.findById(createAppointmentDto.barbershop.id);
        const service = await this.servicesRepository.findById(createAppointmentDto.service.id);
        return this.repositoty.create({
            ...createAppointmentDto, 
            barbershop: babershops,
            service
        });
    }

    findAll(): Promise<Appointment[]> {
        return this.repositoty.findAll();
    }

    findOne(id: number): Promise<Appointment> {
        return this.repositoty.findOne({id});
    }

    async update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
        return this.repositoty.update(id, updateAppointmentDto);
    }

    async remove(id: number): Promise<void> {
        return this.repositoty.delete(id);
    }
}
