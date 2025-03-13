import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@modules/users/controllers/user.controller';
import { UsersService } from '@modules/users/services/users.service';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { User } from '@modules/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository], 
})
export class UsersModule {}
