import { Module } from '@nestjs/common';
import { BarbershopsService } from '@modules/barbershops/services/barbershops.service';
import { BarbershopsController } from '@modules/barbershops/controllers/barbershops.controller';
import { BarbershopsRepository } from '@modules/barbershops/repositories/barbershops.repository';
import { UsersModule } from '@modules/users/users.module';
import { Barbershop } from '@modules/barbershops/entities/barbershop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BarbershopsController],
  imports: [TypeOrmModule.forFeature([Barbershop]), UsersModule],
  providers: [
    BarbershopsService, 
    BarbershopsRepository
  ],
  exports: [BarbershopsService, BarbershopsRepository]
})
export class BarbershopsModule {}
