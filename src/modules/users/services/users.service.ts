import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@modules/users/entities/user.entity';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';

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
}
