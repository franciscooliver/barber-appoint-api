import { Barbershop } from '@modules/barbershops/entities/barbershop.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @ManyToOne(() => Barbershop, (barbershop) => barbershop.services)
  barbershop: Barbershop;
}
