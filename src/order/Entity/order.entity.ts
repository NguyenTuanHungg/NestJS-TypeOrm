import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn } from 'typeorm';
import { User } from '../..//user/entity/user.entity';
import { Book } from 'src/book/entity/book.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookId: number;
  @ManyToOne(() => Book)
  @JoinColumn()
  book:Book
  @Column()
  quantity: number;
  
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  status: string;

  @Column()
  createdAt: Date;

  @Column()
  userId: number;
  @ManyToOne(() => User, user => user.order)
  @JoinColumn()
  user: User;
}