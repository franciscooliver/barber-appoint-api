import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { UsersService } from '@modules/users/services/users.service';
import { User } from '@modules/users/entities/user.entity';

// Simula o comportamento do repositório
const mockUserRepository = {
  findOneBy: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService, UsersRepository,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a user by email', async () => {
    const email = 'joao.silva@example.com';
    const user = { id: 1, email, password: 'test' };

    // Simula o retorno da função findOne
    mockUserRepository.findOne.mockResolvedValue(user);

    const result = await service.findOneByEmail(email);
    expect(result).toEqual(user);
    // expect(mockUserRepository.findOne).toHaveBeenCalledWith({ email });
  });
});
