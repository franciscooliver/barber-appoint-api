import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Appointment } from '@modules/appointments/entities/appointment.entity';
import { Service } from '@modules/services/entities/service.entity';
import { Address } from '@modules/addresses/entities/address.entity';

@Entity('barbershops')
export class Barbershop {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @OneToOne(() => Address, { eager: true, cascade: true })
  @JoinColumn()
  address: Address;

  @ManyToOne(() => User, (user) => user.barbershops, { eager: true })
  owner: User; // O proprietário (associado à entidade User)

  @OneToMany(() => Appointment, (appointment) => appointment.barbershop, {
    cascade: true,
  })
  appointments: Appointment[]; // Relacionamento com Appointment

  @OneToMany(() => Service, (service) => service.barbershop, {
    eager: true,
    cascade: true,
  })
  services: Service[];
}
