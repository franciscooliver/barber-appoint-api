import { Address } from '@modules/addresses/entities/address.entity';
import { IsIn, IsNotEmpty, IsObject, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsIn(['client', 'barbershop'])
  role: 'client' | 'barbershop';

  @IsOptional()
  @IsObject()
  address?: Address; 
}
