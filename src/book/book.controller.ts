import { Controller,Get,Query,Param,Put,Delete,Post,Body, UseGuards } from '@nestjs/common';
import {BookService} from './book.service'
import {Book} from '..//book/entity/book.entity'
import { Repository,DeleteResult,UpdateResult, FindOneOptions } from 'typeorm';
import { title } from 'process';

import {Role} from '..//user/role/role.enum'


import { JwtAuthGuard } from 'src/user/auth/jwt-auth.guard';
import { createBookDto } from './dto/create-book.dto';
import { Roles } from 'src/user/role/roles.decorator';
import { RolesGuard } from 'src/user/role/role.guard';
@Controller('book')
export class BookController {
    constructor(
        private bookService: BookService
    ){
    }
       
        @Roles(Role.Admin)
        @UseGuards(JwtAuthGuard,RolesGuard)
        @Get()
        async findAll(@Query('page') page: number = 1,
        @Query('limit') limit: number = 3,): Promise<{books:Book[];total:number}> {
            return await this.bookService.findAll(page,limit)
        }
        @Roles(Role.Admin)
        @UseGuards(JwtAuthGuard,RolesGuard)
        @Post()
        async createBook(
            @Body() 
            book:createBookDto,
        ): Promise<Book>{
            return this.bookService.create(book)
        }
        
        @Roles(Role.Admin)
        @UseGuards(JwtAuthGuard,RolesGuard)
        @Get(':id')
        async getBook(@Param('id') id:number): Promise<Book>{
            return this.bookService.findById(id)
        }

        @Roles(Role.Admin)
        @UseGuards(JwtAuthGuard,RolesGuard)
        @Put(':id')
        async updateBook(@Param('id') id:number,@Body() book:Book):  Promise<UpdateResult>{
            return this.bookService.UpdateById(id,book);

        }
        
        @Roles(Role.Admin)
        @UseGuards(JwtAuthGuard,RolesGuard)
        @Delete(':id')
        async deleteBook(@Param('id') id:number): Promise<DeleteResult>{
            return this.bookService.deleteById(id);
        } 

        @Get('/search')
        async searchByName(@Query('title') title: string) {
          return this.bookService.searchByName(title);
        }   
    
}
