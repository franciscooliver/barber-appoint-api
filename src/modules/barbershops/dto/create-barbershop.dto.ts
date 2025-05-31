import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsOptional,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from '@modules/addresses/dto/create-address.dto';
import { Address } from '@modules/addresses/entities/address.entity';

export class CreateBarbershopDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  // @Type(() => CreateAddressDto)
  address: Address;

  @IsOptional()
  ownerId: number;
}
