import { Injectable } from '@nestjs/common';
import { Order } from '../order/Entity/order.entity';
import { EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {CreateOrderDto} from '..//order/dto/create-order.dto'
import { BookService } from '../book/book.service';
import { User } from '../user/entity/user.entity';
import {Book} from '..//book/entity/book.entity'
@Injectable()
export class OrderService {
  
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo:Repository<Order>,
   
  ) {}

  async placeOrder(createOrderDto: CreateOrderDto) {
    const { quantity, userId, bookId,name,address,phone}=createOrderDto
    
    const order = new Order();
    order.address=address;
    order.name=name;
    order.phone=phone
    order.quantity = quantity;   
    order.status = 'pending';
    order.createdAt = new Date();
    order.user = { id: userId } as User;
    order.book = { id: bookId } as Book;

    await this.orderRepo.save(order);

    return order;
  }

  async getOrders(userId: number): Promise<Order[]> {
    return this.orderRepo.find({ where: { user: { id: userId } }, relations: ['book'] });
  }
}
