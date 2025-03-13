import * as bcrypt from 'bcrypt';
import { Barbershop } from '@modules/barbershops/entities/barbershop.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Appointment } from '@modules/appointments/entities/appointment.entity';
import { Address } from '@modules/addresses/entities/address.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: ['client', 'barbershop'],
    default: 'client',
  })
  role: 'client' | 'barbershop';

  @OneToMany(() => Barbershop, (barbershop) => barbershop.owner)
  barbershops: Barbershop[];

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  // Hook para criptografar a senha antes de salvar ou atualizar
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(); 
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
