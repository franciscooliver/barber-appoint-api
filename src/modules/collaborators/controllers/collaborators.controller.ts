import { Controller, Post, Body } from '@nestjs/common';
import { CollaboratorsService } from '../services/collaborators.service';
import { CreateCollaboratorDto } from '../dto/create-collaborator.dto';

@Controller('collaborators')
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @Post()
  async create(@Body() createCollaboratorDto: CreateCollaboratorDto) {
    return await this.collaboratorsService.create(createCollaboratorDto);
  }
}
