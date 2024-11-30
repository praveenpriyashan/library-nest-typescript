import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import { UpdateBookDto } from './dto/update-book.dto';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class BookService {

  constructor(@InjectModel(Book.name) private bookModel: mongoose.Model<Book>) {}

  async getAllBooks(query: Query): Promise<Book[]> {
    const keyword = query.keyword ? { title: { $regex: query.keyword, $options: 'i' } } : {};
    const books = await this.bookModel.find(keyword);
    return books;
  }

  async findById(id: string): Promise<Book> {
    const isInvalid = mongoose.isValidObjectId(id);    //check the id in the database
    if (!isInvalid) throw new NotFoundException('Invalid id');
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException('book not found');
    return book;
  }

  async createBook(book: Book,user:User): Promise<Book> {
    const data=Object.assign(book,{user:user._id})       //book object ekata userId eka dagnnva.
    const res = await this.bookModel.create(data);
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

