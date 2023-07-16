import { PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateItemDto extends PartialType(CreateItemDto) {}

export class UpdateExpiredDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsBoolean()
  @IsNotEmpty()
  expired: boolean;
}
