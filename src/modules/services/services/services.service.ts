import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '@modules/services/entities/service.entity';
import { ServicesRepository } from '@modules/services/repositories/service.repository';
import { CreateServiceDto } from '@modules/services/dto/create-service.dto';
import { BarbershopsRepository } from '@modules/barbershops/repositories/barbershops.repository';

@Injectable()
export class ServicesService {
  constructor(
    private servicesRepository: ServicesRepository,
    private barbershopsRepository: BarbershopsRepository,
  ) {}

  async findAll(): Promise<Service[]> {
    return this.servicesRepository.findAll();
  }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    return this.servicesRepository.create(createServiceDto);
  }

  async findOne(id: number): Promise<Service> {
    return this.servicesRepository.findById(id);
  }

  async toggleStatus(id: number): Promise<Service> {
    const service = await this.servicesRepository.findById(id);
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    
    return this.servicesRepository.updateStatus(id, !service.isActive);
  }

  async findActive(): Promise<Service[]> {
    return this.servicesRepository.findActive();
  }
}
