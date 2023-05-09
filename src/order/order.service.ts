import { Injectable } from '@nestjs/common';
import { Order } from '../order/Entity/order.entity';
import {
  EntityRepository,
  Repository,
  DeleteResult,
  UpdateResult,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateOrderDto } from '..//order/dto/create-order.dto';
import { BookService } from '../book/book.service';
import { User } from '../user/entity/user.entity';
import { Book } from '..//book/entity/book.entity';
import { UpdateOrderDto } from './/dto/update-order.dto';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async placeOrder(createOrderDto: CreateOrderDto, totalPrice: number) {
    const { quantity, userId, bookId, name, address, phone, voucher } =
      createOrderDto;

    const book: Book = await this.bookRepo.findOne({ where: { id: bookId } });

    // Giảm giá nếu có voucher
    if (voucher) {
      totalPrice = (totalPrice * (100 - voucher)) / 100;
    }

    totalPrice = book.price * quantity;
    const order = new Order();
    order.address = address;
    order.name = name;
    order.phone = phone;
    order.quantity = quantity;
    order.totalPrice = totalPrice;
    order.status = 'pending';
    order.createdAt = new Date();
    order.user = { id: userId } as User;
    order.book = { id: bookId } as Book;

    await this.orderRepo.save(order);

    return order;
  }

  async getOrders(userId: number): Promise<{ order: Order[]; total: number }> {
    const order = await this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['book'],
    });

    const total = order.reduce((acc, orderItem) => {
      return acc + orderItem.book.price * orderItem.quantity;
    }, 0);

    return { order, total };
  }

  async removeOrder(id: number): Promise<DeleteResult> {
    return this.orderRepo.delete(id);
  }

  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<UpdateResult> {
    const order = await this.orderRepo.update(
      {
        id,
      },
      updateOrderDto,
    );
    return order;
  }
}
