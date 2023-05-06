import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './Entity/order.entity';
import { BookService } from 'src/book/book.service';
import { Book } from 'src/book/entity/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Book]),
  ],
  controllers: [OrderController],
  providers: [OrderService, BookService],
})
export class OrderModule {}
