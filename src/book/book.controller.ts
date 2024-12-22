import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuardd } from '../auth/guards/auth.guard';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {
  }

  @Get()
  @Roles(Role.Admin, Role.User)
  // @UseGuards(AuthGuard(), RolesGuard)         //authentication and autherizations
  @UseGuards(AuthGuardd,RolesGuard)         //authentication and autherizations
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    console.log(' getAllBooks method in the controller');
    return this.bookService.getAllBooks(query);
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    console.log(' getBookById method in the controller');
    return this.bookService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createBooks(@Body() book: CreateBookDto, @Req() req): Promise<Book> {   //ena req eken token eka argena eken token eka argena eken user va gannva.
    console.log(' createBooks method in the controller');
    return this.bookService.createBook(book, req.user);
  }

  @Put(':id')
  async updateBooks(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
    console.log(' updateBooks method in the controller');
    return this.bookService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  async deleteBooks(@Param('id') id: string): Promise<Book> {
    console.log(' deleteBooks method in the controller');
    return this.bookService.deleteBookById(id);
  }
}
