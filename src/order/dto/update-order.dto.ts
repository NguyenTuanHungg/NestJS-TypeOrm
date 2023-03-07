
import { IsNotEmpty, IsString, IsEmail, MinLength,IsNumber } from '@nestjs/class-validator';
export class UpdateOrderDto{
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
}