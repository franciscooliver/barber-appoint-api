import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from '@modules/users/entities/user.entity';
import { Collaborator } from '@modules/collaborators/entities/collaborator.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  country: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ nullable: true })
  neighborhood: string;

  @Column()
  zipcode: string;

  @OneToOne(() => User, (user) => user.address)
  user: User;

  @OneToOne(() => Collaborator, (collaborator) => collaborator.address)
  collaborator: Collaborator;
}
