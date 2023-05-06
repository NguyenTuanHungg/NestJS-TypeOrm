import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './entity/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '..//book/entity/book.entity';
import { BookService } from '..//book/book.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../user/auth/constant';
@Module({
  imports: [TypeOrmModule.forFeature([Cart]), TypeOrmModule.forFeature([Book])],
  controllers: [CartController],
  providers: [CartService, BookService],
})
export class CartModule {}
