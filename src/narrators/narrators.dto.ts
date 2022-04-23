import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { Bani, BirthPlace, NarratorsStatus } from './narrators.enum';

export class NarratorsReqDto {
  constructor(dto: NarratorsReqDto) {
    Object.assign(this, dto);
  }

  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsEnum(NarratorsStatus)
  status: NarratorsStatus;

  @ApiProperty()
  @IsEnum(BirthPlace)
  birthPlace: BirthPlace;

  @ApiProperty()
  @IsEnum(Bani)
  bani: Bani;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  misc?: string[];
}

export class NarratorsResDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  status: NarratorsStatus;

  @ApiProperty()
  birthPlace: BirthPlace;

  @ApiProperty()
  bani: Bani;

  @ApiProperty()
  @IsOptional()
  misc?: string[];
}
