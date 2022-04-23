import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { constructSwaggerErrorResponses } from 'src/shared/swagger.helper';
import { BooksReqDto, BooksResDto } from './books.dto';
import { BooksService } from './books.service';

@ApiTags('books')
@Controller('books')
export class BooksController {
	constructor(private readonly booksService: BooksService) { }

	@Get()
	@ApiOperation({
		operationId: 'getBooks',
		description: 'Get all books',
		summary: 'Get all books',
	})
	@ApiNotFoundResponse(
		constructSwaggerErrorResponses([
			{
				message: 'Retrieve books failed',
				statusCode: 404,
				errorCode: '10002',
			},
		]),
	)
	async getBooks(): Promise<BooksResDto[]> {
		return this.booksService.getBooks();
	}

	@Get('book/:bookId')
	@ApiOperation({
		operationId: 'getBook',
		description: 'Get book by id',
		summary: 'Get book by id',
	})
	@ApiNotFoundResponse(
		constructSwaggerErrorResponses([
			{
				message: 'Retrieve book by id failed',
				statusCode: 404,
				errorCode: '10002',
			},
		]),
	)
	async getBookById(
		@Param('bookId') bookId: string,
	): Promise<BooksResDto> {
		return this.booksService.getBookById(bookId);
	}

	@Post('book')
	@ApiOperation({
		operationId: 'createBook',
		description: 'Create book by id',
		summary: 'Create book by id',
	})
	@ApiNotFoundResponse(
		constructSwaggerErrorResponses([
			{
				message: 'Create book failed',
				statusCode: 404,
				errorCode: '10001',
			},
		]),
	)
	async createBook(
		@Body() params: BooksReqDto,
	): Promise<BooksResDto> {
		return this.booksService.createBook(params);
	}

	@Put('book/:bookId')
	@ApiOperation({
		operationId: 'updateBook',
		description: 'Update book by id',
		summary: 'Update book by id',
	})
	@ApiNotFoundResponse(
		constructSwaggerErrorResponses([
			{
				message: 'Update book failed',
				statusCode: 404,
				errorCode: '10001',
			},
		]),
	)
	async updateBook(
		@Param('bookId') bookId: string,
		@Body() params: BooksReqDto,
	): Promise<BooksResDto> {
		return this.booksService.updateBook(bookId, params);
	}

	@Delete('book/:bookId')
	@ApiOperation({
		operationId: 'deleteBook',
		description: 'Delete book by id',
		summary: 'Delete book by id',
	})
	@ApiNotFoundResponse(
		constructSwaggerErrorResponses([
			{
				message: 'Delete book failed',
				statusCode: 404,
				errorCode: '10001',
			},
		]),
	)
	async deleteBook(
		@Param('bookId') bookId: string,
	): Promise<BooksResDto> {
		return this.booksService.deleteBook(bookId);
	}
}
