import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { HadithStatus } from './hadith.enum';
import { Content, HadithContent } from './hadith.model';

export class HadithReqDto {
  constructor(dto: HadithReqDto) {
    Object.assign(this, dto);
  }

  // @IsString()
  // @ApiProperty()
  // hadithId: string;

  @Type(() => Content)
  @ApiProperty()
  content: Content;

  @IsArray()
  chains: string[];

  @IsString()
  narratedBy: string;

  @Type(() => HadithContent)
  hadithContent: HadithContent;

  @IsEnum(HadithStatus, { each: true })
  status: HadithStatus;
}

export class HadithResDto {
  @ApiProperty()
  content: Content;

  @ApiProperty()
  chains: string[];

  @ApiProperty()
  narratedBy: string;

  @ApiProperty()
  hadithContent: HadithContent;

  @ApiProperty()
  status: HadithStatus;
}
