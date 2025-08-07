import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Barbershop } from '@modules/barbershops/entities/barbershop.entity';
import { BarbershopsService } from '@modules/barbershops/services/barbershops.service';
import { CreateBarbershopDto } from '@modules/barbershops/dto/create-barbershop.dto';
import { UpdateBarbershopDto } from '@modules/barbershops/dto/update-barbershop.dto';
import { GetUser } from '@common/decorators/getuser.decorator';
import { User } from '@modules/users/entities/user.entity';

@Controller('barbershops')
export class BarbershopsController {
  constructor(private readonly barbershopService: BarbershopsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createBarbershopDto: CreateBarbershopDto,
    @GetUser() user: User,
  ): Promise<Barbershop> {
    return this.barbershopService.create({
      ...createBarbershopDto,
      ownerId: createBarbershopDto.ownerId ?? user.id,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<Barbershop[]> {
    return this.barbershopService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Barbershop> {
    return this.barbershopService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBarbershopDto: UpdateBarbershopDto,
  ): Promise<void> {
    return this.barbershopService.update(id, updateBarbershopDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.barbershopService.delete(id);
  }
}
