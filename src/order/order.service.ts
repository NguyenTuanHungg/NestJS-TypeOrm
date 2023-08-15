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
import { OrderItem } from './Entity/order-item.entity';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) { }

  async placeOrder(
    createOrderDto: CreateOrderDto,
    totalPrice: number,
    user: User,
  ) {
    const { quantity, bookId, name, address, phone, voucher } = createOrderDto;

    const book: Book = await this.bookRepo.findOne({ where: { id: bookId } });

    // Giảm giá nếu có voucher
    if (voucher) {
      totalPrice = (totalPrice * (100 - voucher)) / 100;
    }

    const order = new Order();
    order.name = createOrderDto.name;
    order.address = createOrderDto.address;
    order.phone = createOrderDto.phone;
    order.status = 'pending';
    order.totalPrice = 0;
    order.user = user;


    const savedOrder = await this.orderRepo.save(order);
    const orderItems = createOrderDto.items.map((item) => {
      const orderItem = new OrderItem();
      orderItem.order = savedOrder;
      orderItem.book = { id: bookId } as Book;
      orderItem.quantity = item.quantity;
      orderItem.subtotal = item.quantity * item.book.price;
      // Tính toán subtotal
      return orderItem;
    });

    await this.orderItemRepository.save(orderItems);

    // Tính toán và cập nhật lại totalPrice cho entity Order
    totalPrice = orderItems.reduce((total, item) => total + item.subtotal, 0);
    savedOrder.totalPrice = totalPrice;
    await this.orderRepo.save(savedOrder);

    return savedOrder;
  }

  async getOrders(userId: number): Promise<Order[]> {
    const order = await this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['orderItems'],
    });



    return order;
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
