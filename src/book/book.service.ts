import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';


@Injectable()
export class BookService {

  constructor(@InjectModel(Book.name) private bookModel: mongoose.Model<Book>) {
  }

  async getAllBooks(query: Query): Promise<Book[]> {
    const keyword = query.keyword ? { title: { $regex: query.keyword, $options: 'i' } } : {};
    const books = await this.bookModel.find(keyword);
    return books;
  }

  async createBook(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  async findById(id: string): Promise<Book> {
    const isInvalid = mongoose.isValidObjectId(id);
    if (!isInvalid) {
      throw new NotFoundException('Invalid id');
    }
    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('book not found');
    }
    return book;
  }


  async updateBook(id: string, book: Book): Promise<Book> {
    const res = await this.bookModel.findByIdAndUpdate(id, book, {
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

