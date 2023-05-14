import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Book } from 'src/book/entity/book.entity';
import { IsString, IsInt, IsDate, IsNumber } from '@nestjs/class-validator';

@Entity()
export class Cart {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Book, (book) => book.cart)
  @JoinColumn()
  book: Book;

  @IsInt()
  @Column()
  bookId: number;

  @IsInt()
  @Column()
  quantity: number;

  @IsNumber()
  @Column()
  totalPrice: number;
}
