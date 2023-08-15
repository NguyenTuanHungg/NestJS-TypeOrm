import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../..//user/entity/user.entity';
import { Book } from 'src/book/entity/book.entity';
import { OrderItem } from './order-item.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;


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
  totalPrice: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];


  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'userId' })
  user: User;
}
