import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from '@modules/appointments/dto/create-appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}
// This DTO inherits all properties from CreateAppointmentDto, including the new collaborator field
