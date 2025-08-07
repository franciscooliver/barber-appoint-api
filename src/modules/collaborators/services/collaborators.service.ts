import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collaborator } from '../entities/collaborator.entity';
import { CreateCollaboratorDto } from '../dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from '../dto/update-collaborator.dto';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(Collaborator)
    private collaboratorRepository: Repository<Collaborator>,
  ) {}

  async create(
    createCollaboratorDto: CreateCollaboratorDto,
  ): Promise<Collaborator> {
    const collaborator = this.collaboratorRepository.create(
      createCollaboratorDto,
    );
    return await this.collaboratorRepository.save(collaborator);
  }

  async update(
    id: number,
    updateCollaboratorDto: UpdateCollaboratorDto,
  ): Promise<Collaborator> {
    const collaborator = await this.collaboratorRepository.findOne({
      where: { id },
    });

    if (!collaborator) {
      throw new NotFoundException(`Collaborator with ID ${id} not found`);
    }

    Object.assign(collaborator, updateCollaboratorDto);
    return await this.collaboratorRepository.save(collaborator);
  }

  async findOne(id: number): Promise<Collaborator> {
    const collaborator = await this.collaboratorRepository.findOne({
      where: { id },
      relations: ['address'],
    });

    if (!collaborator) {
      throw new NotFoundException(`Collaborator with ID ${id} not found`);
    }

    return collaborator;
  }
}
