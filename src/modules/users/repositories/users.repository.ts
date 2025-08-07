import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/users/entities/user.entity';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UserDto } from '@modules/users/dto/user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<UserDto> {
    return this.repository.findOne({ where: { id } });
  }

  findOne(params: any): Promise<User | null> {
    return this.repository.findOne({ where: params });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .leftJoinAndSelect('user.address', 'address')
      .where('user.email = :email', { email })
      .getOne();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.repository.create(createUserDto);
    await this.repository.save(newUser);
    return this.findOne({ id: newUser.id });
  }

  async save(user: User): Promise<User> {
    await this.repository
      .createQueryBuilder()
      .update(User)
      .set(user)
      .where('id = :id', { id: user.id })
      .execute();

    return this.repository.findOne({
      where: { id: user.id },
      relations: ['address'],
    });
  }
}
