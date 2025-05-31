import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@modules/users/entities/user.entity';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UpdateUserDto } from '@modules/users/dto/update-user.dto';
import { log } from 'console';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[] | null> {
    return this.usersRepository.findAll();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneByEmail(email);
  }

  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.create(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = Object.assign(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }
}
