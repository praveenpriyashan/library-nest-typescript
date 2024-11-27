import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

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
  async updateBooks (@Param('id')id:string,@Body() book:UpdateBookDto): Promise<Book> {
    return this.bookService.updateBook(id,book);
  }

  @Delete(':id')
  async deleteBooks (@Param('id')id:string): Promise<Book> {
    return this.bookService.deleteBookById(id)
  }
}
