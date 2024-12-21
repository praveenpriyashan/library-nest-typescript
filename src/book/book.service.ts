import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import { UpdateBookDto } from './dto/update-book.dto';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class BookService {

  constructor(@InjectModel(Book.name) private bookModel: mongoose.Model<Book>) {
    console.log('contructor in the BookService')
  }

  async getAllBooks(query: Query): Promise<Book[]> {
    console.log('getAllBooks method in the BookService')
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    const keyword = query.keyword ? { title: { $regex: query.keyword, $options: 'i' } } : {};
    const books = await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip);
    console.log('get alll books ')
    return books;
  }

  async findById(id: string): Promise<Book> {
    console.log('findById method in the BookService')
    const isInvalid = mongoose.isValidObjectId(id);    //check the id in the database
    if (!isInvalid) throw new NotFoundException('Invalid id');
    console.log('the given id is in the findById is valid');
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException('book not found');
    console.log('find the book in findById ');
    return book;
  }

  async createBook(book: Book, user: User): Promise<Book> {
    console.log('start create the book in createBook ');
    const data = Object.assign(book, { user: user._id });       //book object ekata userId eka dagnnva.
    const res = await this.bookModel.create(data);
    console.log('end create the book in createBook ');
    return res;
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const res = await this.bookModel.findByIdAndUpdate(id, updateBookDto, {
      new: true,
      runValidators: true,
    });
    return res;
  }

  async deleteBookById(id: string): Promise<Book> {
    const res = await this.bookModel.findByIdAndDelete(id);
    return res;
  }
}

