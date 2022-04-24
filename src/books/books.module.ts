import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { Books } from './books.model';
import { BooksService } from './books.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Books.name, schema: Books.schema }]),
  ],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService, MongooseModule],
})
export class BooksModule {}
