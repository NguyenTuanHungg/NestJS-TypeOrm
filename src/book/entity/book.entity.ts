import { IsNumber } from '@nestjs/class-validator';
import { Order } from 'src/order/Entity/order.entity';
import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,JoinColumn,OneToMany,IsNull} from 'typeorm';
import {Cart} from '../..//cart/entity/cart.entity'

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  publishedYear: number;
  @OneToMany(() => Cart,cart=>cart.book)
  @JoinColumn()
  cart:Cart
  
}