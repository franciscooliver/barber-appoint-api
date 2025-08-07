import { IsString, IsOptional, Length, Matches } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsOptional()
  @IsString()
  neighborhood?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zipcode?: string;

  @IsOptional()
  @IsString()
  @Length(2, 2, { message: 'UF must be exactly 2 characters' })
  @Matches(/^[A-Z]{2}$/, { message: 'UF must be 2 uppercase letters' })
  uf?: string;
}
