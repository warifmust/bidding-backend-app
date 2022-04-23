import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BooksReqDto, BooksResDto } from './books.dto';
import { Model } from 'mongoose';
import { Books } from './books.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Books.name)
    private readonly booksModel: Model<Books>,
  ) {}

  async getBooks(): Promise<BooksResDto[]> {
    return this.booksModel.find({}).exec();
  }

  async getBookById(bookId: string): Promise<BooksResDto> {
    const book = await this.booksModel.findById({ _id: bookId }).exec();
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async createBook(params: BooksReqDto): Promise<BooksResDto> {
    return this.booksModel.create({
      name: params.name,
      author: params.author,
      syarah: params.syarah,
    });
  }

  async updateBook(bookId: string, params: BooksReqDto): Promise<BooksResDto> {
    const book = await this.booksModel.findById({ _id: bookId }).exec();
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    return this.booksModel
      .findOneAndUpdate(
        {
          _id: bookId,
        },
        {
          ...(params.name && { name: params.name }),
          ...(params.author && { author: params.author }),
          ...(params.syarah.syarahList && {
            syarah: {
              // TO FIX: SyarahList
              $push: { syarahList: params.syarah.syarahList },
              bestSyarah: book.syarah.bestSyarah,
            },
          }),
          ...(params.syarah.bestSyarah && {
            bestSyarah: params.syarah.bestSyarah,
          }),
        },
      )
      .exec();
  }

  async deleteBook(bookId: string): Promise<BooksResDto> {
    const hadith = await this.booksModel.findById({ _id: bookId }).exec();
    if (!hadith) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    return this.booksModel.findByIdAndRemove(bookId).exec();
  }
}
