import { ClassSerializerInterceptor, Injectable, UseInterceptors, NotFoundException, BadRequestException } from '@nestjs/common';
import { Appointment } from '@modules/appointments/entities/appointment.entity';
import { CreateAppointmentDto } from '@modules/appointments/dto/create-appointment.dto';
import { UpdateAppointmentDto } from '@modules/appointments/dto/update-appointment.dto';
import { AppointmentRepository } from '@modules/appointments/repositories/appointment.repository';
import { BarbershopsRepository } from '@modules/barbershops/repositories/barbershops.repository';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { ServicesRepository } from '@modules/services/repositories/service.repository';
import { UpdateStatusDto } from '../dto/update-status.dto';
import { AppointmentStatus } from '../types/appointment-status.enum';

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

    async cancelAppointment(id: number): Promise<Appointment> {
        const appointment = await this.repositoty.findOne({id});
        
        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }

        if (appointment.status === AppointmentStatus.CANCELLED) {
            throw new BadRequestException('Appointment is already cancelled');
        }

        if (appointment.status === AppointmentStatus.COMPLETED) {
            throw new BadRequestException('Cannot cancel completed appointment');
        }

        return this.repositoty.updateStatus(id, { status: AppointmentStatus.CANCELLED });
    }

    async updateStatus(id: number, updateStatusDto: UpdateStatusDto): Promise<Appointment> {
        const appointment = await this.repositoty.findOne({id});
        
        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }

        if (appointment.status === AppointmentStatus.CANCELLED && updateStatusDto.status !== AppointmentStatus.SCHEDULED) {
            throw new BadRequestException('Cannot update status of cancelled appointment');
        }

        return this.repositoty.updateStatus(id, updateStatusDto);
    }
}
