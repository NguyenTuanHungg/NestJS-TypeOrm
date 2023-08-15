import { IsNumber, IsNotEmpty } from '@nestjs/class-validator';
import { Book } from 'src/book/entity/book.entity';

export class OrderItemDto {
    @IsNotEmpty()
    book: Book;

    @IsNumber()
    quantity: number;

    @IsNumber()
    subtotal: number;
}