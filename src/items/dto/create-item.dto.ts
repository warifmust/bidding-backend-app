import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  itemName: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  durationInMinutes: number;

  @IsString()
  @IsOptional()
  belongsTo?: string;

  @IsBoolean()
  @IsNotEmpty()
  expired: boolean;
}
