import { Entity, Column, PrimaryGeneratedColumn,OneToMany,JoinColumn } from 'typeorm';
import {Book} from '../../book/entity/book.entity'
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Book,book=>book.category)
  @JoinColumn()
   book:Book

}