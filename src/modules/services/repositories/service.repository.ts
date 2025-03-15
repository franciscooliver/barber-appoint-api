import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/users/entities/user.entity';
import { Service } from '@modules/services/entities/service.entity';
import { CreateServiceDto } from '../dto/create-service.dto';

@Injectable()
export class ServicesRepository {

  constructor(
    @InjectRepository(Service)
    private repository: Repository<Service>
  ) {}
  
  findAll(): Promise<Service[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<Service> {
    return this.repository.findOne({ where: { id } });
  }

  findOne(params: any): Promise<Service | null> {
    return this.repository.findOne({ where: params });
  }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = await this.repository.create(createServiceDto);
    return this.repository.save(newService);
  }

  async updateStatus(id: number, isActive: boolean): Promise<Service> {
    await this.repository.update(id, { isActive });
    return this.findById(id);
  }

  findActive(): Promise<Service[]> {
    return this.repository.find({
      where: { isActive: true }
    });
  }
}
