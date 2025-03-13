import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Appointment } from '@modules/appointments/entities/appointment.entity';
import { Address } from '@modules/addresses/entities/address.entity';

@Entity('collaborators')
export class Collaborator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
  
  @Column({ nullable: true })
  phone?: string;

  @OneToMany(() => Appointment, (appointment) => appointment.collaborator)
  appointments: Appointment[];

  // Novo relacionamento com Address
  @OneToOne(() => Address, (address) => address.collaborator, { nullable: true })
  @JoinColumn()
  address?: Address;
}
