import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Appointment } from '@modules/appointments/entities/appointment.entity';
import { Service } from '@modules/services/entities/service.entity';

@Entity('barbershops')
export class Barbershop {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @ManyToOne(() => User, (user) => user.barbershops)
  owner: User; // O proprietário (associado à entidade User)
  
  @OneToMany(() => Appointment, (appointment) => appointment.barbershop)
  appointments: Appointment[];  // Relacionamento com Appointment

  @OneToMany(() => Service, (service) => service.barbershop)
  services: Service[];
}

