import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@modules/users/entities/user.entity';
import { Barbershop } from '@modules/barbershops/entities/barbershop.entity';
import { Service } from '@modules/services/entities/service.entity';
import { Collaborator } from '@modules/collaborators/entities/collaborator.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @ManyToOne(() => Barbershop, (barbershop) => barbershop.appointments)
  barbershop: Barbershop;

  @ManyToOne(() => Service)
  service: Service;

  @Column()
  appointmentDate: Date;

  @Column()
  time: string;

  @Column()
  status: string;

  @Column({ name: 'collaborator_id', nullable: true })
  collaboratorId: number;

  @ManyToOne(() => Collaborator, (collaborator) => collaborator.appointments, {
    nullable: true,
  })
  @JoinColumn({ name: 'collaborator_id' })
  collaborator?: Collaborator;
}
