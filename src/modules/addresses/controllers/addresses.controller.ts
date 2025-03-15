import { Controller, Post, Body, UseGuards, Put, Param } from '@nestjs/common';
import { AddressesService } from '../services/addresses.service';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createAddressDto: CreateAddressDto) {
    return await this.addressesService.create(createAddressDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return await this.addressesService.update(id, updateAddressDto);
  }
}
