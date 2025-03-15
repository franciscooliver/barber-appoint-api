import { IsEnum, IsNotEmpty } from 'class-validator';
import { AppointmentStatus } from '../types/appointment-status.enum';

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}
