import { Address } from "@modules/addresses/entities/address.entity";

export class UserDto {
  id?: number;
  name: string;
  email: string;
  role: 'client' | 'barbershop';
  isActive: boolean;
  address?: Address;
}
  