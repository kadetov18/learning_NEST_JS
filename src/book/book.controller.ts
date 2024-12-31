import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('books')
export class BookController {
  constructor(private boockServiсe: BookService) {}
  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.boockServiсe.getAll(query);
  }

  @Post('add-new')
  async createBook(
    @Body()
    book: CreateBookDto,
  ): Promise<Book> {
    return this.boockServiсe.create(book);
  }

  @Get(':id')
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.boockServiсe.findById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id')
    id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.boockServiсe.updateById(id, book);
  }

  @Delete(':id')
  deleteBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.boockServiсe.deleteById(id);
  }
}
