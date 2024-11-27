import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  @Post()
  async createBooks(@Body() book:CreateBookDto): Promise<Book> {
    return this.bookService.createBook(book);
  }

  @Get(':id')
  async getBookById(@Param('id')id:string): Promise<Book> {
    return this.bookService.findById(id)
  }

  @Put(':id')
  async createBooksc (@Param(':id')id:string,@Body() book:CreateBookDto): Promise<Book> {
    return this.bookService.createBook(book);
  }
}
