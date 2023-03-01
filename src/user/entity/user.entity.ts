import { Order } from 'src/order/Entity/order.entity';
import { Column, Entity, PrimaryGeneratedColumn,OneToMany,ManyToOne } from 'typeorm';
import {Role} from './../role/role.enum'
import {Cart} from '../../cart/entity/cart.entity'
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    username: string;
  
    @Column()
    password: string;
  
    @Column()
    email: string;
    @OneToMany(() => Order, (order) => order.user)
    order:Order;
    @OneToMany(()=>Cart,cart=>cart.user)
    cart:Cart[]
    @Column({type:'enum',enum:Role,default:Role.User})
    roles:Role
    

}