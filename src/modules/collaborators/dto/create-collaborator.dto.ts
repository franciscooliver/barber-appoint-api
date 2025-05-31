import { Address } from '@modules/addresses/entities/address.entity';
import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsString,
  IsPhoneNumber,
} from 'class-validator';

export class CreateCollaboratorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  @IsString()
  phone?: string;

  @IsOptional()
  address?: Address;
}
