import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './Entity/order.entity';
import { BookService } from 'src/book/book.service';
import { Book } from 'src/book/entity/book.entity';
import { OrderItem } from './Entity/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Book]),
    TypeOrmModule.forFeature([OrderItem]),

  ],
  controllers: [OrderController],
  providers: [OrderService, BookService],
})
export class OrderModule { }
