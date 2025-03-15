import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsEmail, IsBoolean } from 'class-validator';
import { CreateCollaboratorDto } from './create-collaborator.dto';
import { Address } from '@modules/addresses/entities/address.entity';

export class UpdateCollaboratorDto extends PartialType(CreateCollaboratorDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  address?: Address;
}
