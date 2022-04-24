import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum } from 'class-validator';
import { BooksName } from './books.enum';
import { Author, BestSyarah } from './books.model';

export class BooksReqDto {
    constructor(dto: BooksReqDto) {
        Object.assign(this, dto);
    }

    @ApiProperty()
    @IsEnum(BooksName, { each: true })
    name: BooksName;

    @ApiProperty()
    @Type(() => Author)
    author: Author;

    @ApiProperty()
    @Type(() => BestSyarah)
    bestSyarah: BestSyarah;

    @ApiProperty()
    @IsArray()
    syarahList: string[];
}

export class BooksResDto {
    @ApiProperty()
    name: BooksName;

    @ApiProperty()
    author: Author;

    @ApiProperty()
    bestSyarah: BestSyarah;

    @ApiProperty()
    syarahList: string[];
}
