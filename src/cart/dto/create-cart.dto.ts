import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/book/entity/book.entity';
import { User } from 'src/user/entity/user.entity';


export class CreateCartDto {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  user:User
  @ApiProperty()
  bookId: number;
  @ApiProperty()
  book:Book
  @ApiProperty()
  price: number;
  @ApiProperty()
  quantity: number;
}
