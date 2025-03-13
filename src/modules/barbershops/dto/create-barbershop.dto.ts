import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBarbershopDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  ownerId: number;
}
