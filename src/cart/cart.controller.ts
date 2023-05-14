import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from '../cart/entity/cart.entity';
import { User } from '..//user/entity/user.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '..//user/auth/jwt-auth.guard';
import { Roles } from 'src/user/role/roles.decorator';
import { Role } from 'src/user/role/role.enum';
import { RolesGuard } from 'src/user/role/role.guard';
import { GetAuthUser } from 'src/user/decorator/user.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getCart(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<{ cart: Cart[]; total: number }> {
    return this.cartService.getCart(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addToCart(
    @Body() params: CreateCartDto,
    totalPrice: number,
    @GetAuthUser() user: User,
  ): Promise<void> {
    this.cartService.createCart(params, totalPrice, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeFromCart(@Param('id') id: number): Promise<DeleteResult> {
    return await this.cartService.removeById(id);
  }
}
