import { Body, Controller, Get, Post, Param,UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Order } from './/Entity/order.entity';
import { OrderService } from './order.service';
import { User } from '../user/entity/user.entity';
import {CreateOrderDto} from '..//order/dto/create-order.dto'
import { JwtAuthGuard } from '..//user/auth/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async placeOrder(@Body()createOrderDto: CreateOrderDto): Promise<Order> {
    
    const order = await this.orderService.placeOrder(createOrderDto);
    return order;
  }
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getOrders(@Param('userId')userId: number): Promise<Order[]> {
   
    const orders = await this.orderService.getOrders(userId);
    return orders;
  }
}