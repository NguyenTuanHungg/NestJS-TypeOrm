import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { Category } from '../category/entity/category.entity';
import { CategoryService } from '../category/category.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [BookController],
  providers: [BookService, CategoryService],
  exports: [BookService],
})
export class BookModule {}
