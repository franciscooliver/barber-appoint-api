import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ServicesService } from '@modules/services/services/services.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateServiceDto } from '@modules/services/dto/create-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('active')
  findActive() {
    return this.servicesService.findActive();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/toggle-status')
  toggleStatus(@Param('id') id: string) {
    return this.servicesService.toggleStatus(+id);
  }
}
