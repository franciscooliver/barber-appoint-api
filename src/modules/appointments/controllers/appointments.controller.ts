import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UseFilters } from '@nestjs/common';
import { AppointmentsService } from '@modules/appointments/services/appointments.service';
import { CreateAppointmentDto } from '@modules/appointments/dto/create-appointment.dto';
import { UpdateAppointmentDto } from '@modules/appointments/dto/update-appointment.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '@common/decorators/getuser.decorator';
import { User } from '@modules/users/entities/user.entity';
import { SuccessResponseInterceptor } from '@common/interceptors/success-response.interceptor';
import { HttpExceptionFilter } from '@common/exceptions/http-exception.filter';

@Controller('appointments')
@UseInterceptors(SuccessResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class AppointmentsController {
    constructor(
        private readonly appointmentsService: AppointmentsService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createAppointmentDto: CreateAppointmentDto, @GetUser() user: User) { 
        return this.appointmentsService.create({...createAppointmentDto, user });
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
        return this.appointmentsService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.appointmentsService.findOne(+id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
        return this.appointmentsService.update(+id, updateAppointmentDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.appointmentsService.remove(+id);
    }
}
