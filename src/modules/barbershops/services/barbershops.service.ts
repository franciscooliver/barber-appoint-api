import { Injectable, NotFoundException } from '@nestjs/common';
import { BarbershopsRepository } from '@modules/barbershops/repositories/barbershops.repository';
import { CreateBarbershopDto } from '../dto/create-barbershop.dto';
import { UpdateBarbershopDto } from '../dto/update-barbershop.dto';
import { Barbershop } from '../entities/barbershop.entity';
import { UsersRepository } from '@modules/users/repositories/users.repository';

@Injectable()
export class BarbershopsService {
  constructor(private readonly barbershopRepository: BarbershopsRepository) {}

  async create(createBarbershopDto: CreateBarbershopDto): Promise<Barbershop> {
    return this.barbershopRepository.create(createBarbershopDto);
  }

  async findAll(): Promise<Barbershop[]> {
    return this.barbershopRepository.findAll();
  }

  async findById(id: number): Promise<Barbershop> {
    return this.barbershopRepository.findById(id);
  }

  async update(
    id: number,
    updateBarbershopDto: UpdateBarbershopDto,
  ): Promise<void> {
    await this.barbershopRepository.update(id, updateBarbershopDto);
  }

  async delete(id: number): Promise<void> {
    await this.barbershopRepository.delete(id);
  }
}
