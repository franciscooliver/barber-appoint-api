import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CollaboratorsService } from '../services/collaborators.service';
import { CreateCollaboratorDto } from '../dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from '../dto/update-collaborator.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('collaborators')
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createCollaboratorDto: CreateCollaboratorDto) {
    return await this.collaboratorsService.create(createCollaboratorDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCollaboratorDto: UpdateCollaboratorDto,
  ) {
    return await this.collaboratorsService.update(id, updateCollaboratorDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.collaboratorsService.findOne(id);
  }
}
