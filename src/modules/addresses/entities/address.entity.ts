import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '@modules/users/entities/user.entity';
import { Collaborator } from '@modules/collaborators/entities/collaborator.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipcode: string;

  @OneToOne(() => User, (user) => user.address, { nullable: true })
  @JoinColumn()
  user?: User;

  @OneToOne(() => Collaborator, (collaborator) => collaborator.address, { nullable: true })
  @JoinColumn()
  collaborator?: Collaborator;
}
