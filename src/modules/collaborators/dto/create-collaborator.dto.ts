import { IsNotEmpty, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateCollaboratorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsOptional()
  @IsString()
  phone?: string;
}
