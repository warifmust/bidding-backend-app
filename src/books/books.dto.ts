import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum } from "class-validator";
import { BooksName } from "./books.enum";
import { Author, Syarah } from "./books.model";

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
    @Type(() => Syarah)
    syarah: Syarah;
}

export class BooksResDto {
    @ApiProperty()
    name: BooksName;

    @ApiProperty()
    author: Author;

    @ApiProperty()
    syarah: Syarah;
}