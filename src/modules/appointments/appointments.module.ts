import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barbershop } from '@modules/barbershops/entities/barbershop.entity';
import { User } from '@modules/users/entities/user.entity';
import { Appointment } from '@modules/appointments/entities/appointment.entity';
import { AppointmentsController } from '@modules/appointments/controllers/appointments.controller';
import { AppointmentsService } from '@modules/appointments/services/appointments.service';
import { AppointmentRepository } from './repositories/appointment.repository';
import { BarbershopsModule } from '@modules/barbershops/barbershops.module';
import { UsersModule } from '@modules/users/users.module';
import { BarbershopsRepository } from '@modules/barbershops/repositories/barbershops.repository';
import { ServicesModule } from '@modules/services/services.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    BarbershopsModule,
    UsersModule,
    ServicesModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentRepository],
})
export class AppointmentsModule {}
