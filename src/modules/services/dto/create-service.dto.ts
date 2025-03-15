import { Barbershop } from '@modules/barbershops/entities/barbershop.entity';
import { IsString, IsNumber, Min, Max, IsNotEmpty, IsObject, IsBoolean, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  @Max(1000)
  price: number;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsObject()
  @IsNotEmpty()
  barbershop: Barbershop; 

  @IsBoolean()
  @IsOptional()
  isActive: boolean = true; // Valor padrão true caso não seja informado
}
