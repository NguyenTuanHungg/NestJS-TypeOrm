import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { Request } from 'express';
import { Order } from './/Entity/order.entity';
import { OrderService } from './order.service';
import { User } from '../user/entity/user.entity';
import { CreateOrderDto } from '..//order/dto/create-order.dto';
import { JwtAuthGuard } from '..//user/auth/jwt-auth.guard';
import { UpdateOrderDto } from './/dto/update-order.dto';
import { DeleteResult } from 'typeorm';
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async placeOrder(
    @Body() createOrderDto: CreateOrderDto,
    totalPrice: number,
  ): Promise<Order> {
    const order = await this.orderService.placeOrder(
      createOrderDto,
      totalPrice,
    );
    return order;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getOrders(
    @Param('userId') userId: number,
  ): Promise<{ order: Order[]; total: number }> {
    const orders = await this.orderService.getOrders(userId);
    return orders;
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeOrder(@Param('id') id: number): Promise<DeleteResult> {
    return this.orderService.removeOrder(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateOrder(@Param('id') id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder(id, updateOrderDto);
  }
}
