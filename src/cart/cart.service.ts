import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import {Book} from '..//book/entity/book.entity'
import {User} from '..//user/entity/user.entity'
import { Cart } from './entity/cart.entity';
import {CreateCartDto} from './/dto/create-cart.dto'
@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart) 
        private readonly CartRepo:Repository<Cart>,
        @InjectRepository(Book) 
        private readonly bookRepo:Repository<Book>
    ){}

    async getCart(userId:number): Promise<Cart[]> {
        return await this.CartRepo.find({ where: { user: { id: userId } }, relations: ['book'] });
      }
  
    async createCart(cartDto: CreateCartDto): Promise<Cart> {
      const { quantity,price,bookId,userId } = cartDto;
      const book:Book = await this.bookRepo.findOne({where:{id:bookId}});
      const cartItem:Cart = await this.CartRepo.findOne({ where: {book, user: { id:userId } }, relations: ['book'] })

      if(!cartItem){
      const cart = new Cart();
      cart.price=price;
      cart.quantity = 1;
      cart.user = { id: userId } as User;
      cart.book = { id: bookId } as Book;
      return this.CartRepo.save(cart);
      }
      else{
       cartItem.quantity+=1;
      }
      }
      
      async removeById(id: number): Promise<DeleteResult> {
       return await this.CartRepo.delete(id);
      }
    
}
