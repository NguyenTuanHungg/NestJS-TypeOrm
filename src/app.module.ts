import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { BookModule } from './book/book.module';
import { Book } from './book/entity/book.entity';
import { UserModule } from './user/user.module';
import {User} from './user/entity/user.entity'
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entity/cart.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/Entity/order.entity';

import {AccessControlModule} from 'nest-access-control'
import { CategoryModule } from './category/category.module';
import { Category } from './category/entity/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'hunghn2001',
      database: 'NestJS',
      entities: [Book,User,Cart,Order,Category],
      synchronize: true,
    }),
    BookModule,
    UserModule,
    CartModule,
    OrderModule,
    CategoryModule,
   
   
  ],
  controllers: [AppController],
  providers: [AppService,
   
  ],
})
export class AppModule {}
