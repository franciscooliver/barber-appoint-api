import { IsNotEmpty, IsString, Length, Matches, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsString()
  @IsOptional()
  number?: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  zipcode: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2, { message: 'UF must be exactly 2 characters' })
  @Matches(/^[A-Z]{2}$/, { message: 'UF must be 2 uppercase letters' })
  uf: string;
}
