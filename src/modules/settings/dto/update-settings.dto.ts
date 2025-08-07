import {
  IsArray,
  IsObject,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
  MaxLength,
  IsBoolean,
} from 'class-validator';

export class WorkingHoursDTO {
  @IsString()
  start: string;

  @IsString()
  end: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

export class UpdateSettingsDTO {
  @IsArray()
  @Min(0, { each: true })
  @Max(7, { each: true })
  workingDays: number[];

  @IsObject()
  workingHours: {
    [key: number]: WorkingHoursDTO;
  };

  @IsNumber()
  intervalTime: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
