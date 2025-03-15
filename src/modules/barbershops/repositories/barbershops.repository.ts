import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Barbershop } from '@modules/barbershops/entities/barbershop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBarbershopDto } from '@modules/barbershops/dto/create-barbershop.dto';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { UpdateBarbershopDto } from '@modules/barbershops/dto/update-barbershop.dto';

@Injectable()
export class BarbershopsRepository {

    constructor(
        @InjectRepository(Barbershop)
        private repository: Repository<Barbershop>,
        private readonly userRepository: UsersRepository
    ) {}

    findAll(): Promise<Barbershop[]> {
        return this.repository.find({ relations: ['owner'] });
    }

    findOne(params: any): Promise<Barbershop> {
        return this.repository.findOne({where: params});
    }

    findById(id: number): Promise<Barbershop> {
        return this.repository.findOne({
        where: { id },
        relations: ['owner'],
        });
    }
  
    async create(createBarbershopDto: CreateBarbershopDto): Promise<Barbershop> {
        const owner = await this.userRepository.findById(createBarbershopDto.ownerId);
        
        if (!owner) {
            throw new NotFoundException('Owner not found');
        }

        const barbershop = this.repository.create({
            ...createBarbershopDto,
            owner,
        });

        const savedBarbershop = await this.repository.save(barbershop);
        
        // Retorna a barbearia com todas as relações necessárias
        return this.repository.findOne({
            where: { id: savedBarbershop.id },
            relations: ['owner', 'address']
        });
    }

    async update(id: number, updateBarbershopDto: UpdateBarbershopDto): Promise<void> {
        const barbershop = await this.findById(id);
        await this.repository.update(id, { ...barbershop, ...updateBarbershopDto });
    }

    async delete(id: number): Promise<void> {
        const barbershop = await this.findById(id);
        await this.repository.delete(barbershop.id);
    }
}
