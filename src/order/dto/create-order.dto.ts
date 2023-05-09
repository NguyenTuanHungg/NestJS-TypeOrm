import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsNumber,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/book/entity/book.entity';
import { User } from 'src/user/entity/user.entity';
export class CreateOrderDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  user: User;

  @ApiProperty()
  bookId: number;

  @ApiProperty()
  book: Book;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNumber()
  quantity: number;

  @IsString()
  status: string;

  @IsNumber()
  voucher?: number;
}
