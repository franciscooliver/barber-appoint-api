import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Barbershop } from '@modules/barbershops/entities/barbershop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '@modules/appointments/entities/appointment.entity';
import { CreateAppointmentDto } from '@modules/appointments/dto/create-appointment.dto';
import { User } from '@modules/users/entities/user.entity';
import { UpdateAppointmentDto } from '@modules/appointments/dto/update-appointment.dto';
import { Service } from '@modules/services/entities/service.entity';
import { UpdateStatusDto } from '../dto/update-status.dto';

@Injectable()
export class AppointmentRepository {

    constructor(
        @InjectRepository(Appointment)
        private repository: Repository<Appointment>
    ) {}

    findAll(): Promise<Appointment[]> {
        return this.repository.createQueryBuilder('appointment')
          .innerJoinAndSelect('appointment.user', 'client')
          .leftJoinAndSelect('appointment.barbershop', 'barbershop')
          .leftJoinAndSelect('appointment.service', 'service')
          .getMany();
    }

    findOne(params: any): Promise<Appointment> {
        return this.repository.findOne({where: params, relations: ['client', 'barbershop'] });
    }

    findById(id: number): Promise<Appointment> {
        return this.repository.findOne({
        where: { id },
        relations: ['owner'],
        });
    }

    async create(
        createAppointmentDto: CreateAppointmentDto
    ): Promise<Appointment>
    {
        const newAppointment = await this.repository.create({
            ...createAppointmentDto,
            appointmentDate: new Date(createAppointmentDto.appointmentDate),
            status: createAppointmentDto.status || 'scheduled',
        });

        return this.repository.save(newAppointment);
    }

    async update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
        const appointment = await this.findOne({id});

        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }

        Object.assign(appointment, updateAppointmentDto);
        return this.repository.save(appointment);
    }

    async updateStatus(id: number, updateStatusDto: UpdateStatusDto): Promise<Appointment> {
        const appointment = await this.findOne({id});

        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }

        appointment.status = updateStatusDto.status;
        return this.repository.save(appointment);
    }

    async delete(id): Promise<void> {
        const appointment = await this.findOne(id);

        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }

        this.repository.remove(appointment);
    }
}
