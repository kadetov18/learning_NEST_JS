import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
  constructor(private boockServiсe: BookService) {}
  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.boockServiсe.getAll(query);
  }

  @Post('add-new')
  @UseGuards(AuthGuard())
  async createBook(
    @Body()
    book: CreateBookDto,
    @Req() req,
  ): Promise<Book> {
    return this.boockServiсe.create(book, req.user);
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
