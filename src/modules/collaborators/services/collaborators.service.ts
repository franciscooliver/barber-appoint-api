import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collaborator } from '../entities/collaborator.entity';
import { CreateCollaboratorDto } from '../dto/create-collaborator.dto';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(Collaborator)
    private collaboratorRepository: Repository<Collaborator>,
  ) {}

  async create(createCollaboratorDto: CreateCollaboratorDto): Promise<Collaborator> {
    const collaborator = this.collaboratorRepository.create(createCollaboratorDto);
    return await this.collaboratorRepository.save(collaborator);
  }
}
