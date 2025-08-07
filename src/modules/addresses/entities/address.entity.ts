import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  BeforeInsert,
} from 'typeorm';
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

  @Column({ nullable: true })
  number: string;

  @Column()
  zipcode: string;

  @Column({ length: 2, nullable: true })
  uf: string;

  @BeforeInsert()
  transformUf() {
    if (this.uf) {
      this.uf = this.uf.toUpperCase();
      return;
    }

    if (this.state) {
      this.uf = this.state.substring(0, 2).toUpperCase();
    }
  }

  @OneToOne(() => User, (user) => user.address)
  user: User;

  @OneToOne(() => Collaborator, (collaborator) => collaborator.address)
  collaborator: Collaborator;
}
