import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barbershop } from '@modules/barbershops/entities/barbershop.entity';
import { ServicesService } from '@modules/services/services/services.service';
import { ServicesController } from '@modules/services/controllers/services.controller';
import { Service } from '@modules/services/entities/service.entity';
import { ServicesRepository } from '@modules/services/repositories/service.repository';
import { BarbershopsModule } from '@modules/barbershops/barbershops.module';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), BarbershopsModule],
  providers: [ServicesService, ServicesRepository],
  controllers: [ServicesController],
  exports: [ServicesService, ServicesRepository],
})
export class ServicesModule {}
