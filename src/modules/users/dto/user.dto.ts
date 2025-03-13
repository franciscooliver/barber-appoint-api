export class UserDto {
  id?: number;
  name: string;
  email: string;
  role: 'client' | 'barbershop';
  isActive: boolean;
}
  