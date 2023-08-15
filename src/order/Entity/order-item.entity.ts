import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Book } from 'src/book/entity/book.entity';
import { User } from 'src/user/entity/user.entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.orderItems)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column()
    quantity: number;

    @Column()
    subtotal: number;

    @ManyToOne(() => Book)
    @JoinColumn({ name: 'bookId' })
    book: Book;



}