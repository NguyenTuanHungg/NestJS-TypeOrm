import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { Book } from '..//book/entity/book.entity';
import { User } from '..//user/entity/user.entity';
import { Cart } from './entity/cart.entity';
import { CreateCartDto } from './/dto/create-cart.dto';
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly CartRepo: Repository<Cart>,
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async getCart(userId: number): Promise<{ cart: Cart[]; total: number }> {
    const cart = await this.CartRepo.createQueryBuilder('cart')
      .leftJoinAndSelect('cart.book', 'book')
      .leftJoinAndSelect('cart.user', 'user')
      .select([
        'book.id',
        'book.title',
        'book.author',
        'book.price',
        'book.publishedYear',
        'book.description',
        'category.name',
      ])
      .where('user.id = :userId', { userId })
      .getMany();

    const total = cart.reduce((acc, cartItem) => {
      return acc + cartItem.book.price * cartItem.quantity;
    }, 0);

    return { cart, total };
  }

  async createCart(cartDto: CreateCartDto, totalPrice: number): Promise<Cart> {
    const { quantity, bookId, userId } = cartDto;

    const book: Book = await this.bookRepo.findOne({ where: { id: bookId } });

    totalPrice = book.price * quantity;
    const cartItem: Cart = await this.CartRepo.findOne({
      where: { book, user: { id: userId } },
      relations: ['book'],
    });

    if (!cartItem) {
      const cart = new Cart();
      cart.totalPrice = totalPrice;
      cart.quantity = 1;
      cart.user = { id: userId } as User;
      cart.book = { id: bookId } as Book;
      return this.CartRepo.save(cart);
    } else {
      cartItem.quantity += 1;
    }
  }

  async removeById(id: number): Promise<DeleteResult> {
    return await this.CartRepo.delete(id);
  }
}
