import { IsNotEmpty, IsString, IsEmail, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto  {
@ApiProperty({ required: true })
  
  @IsNotEmpty()
  username: string;

  @ApiProperty({ required: true, minLength: 8 })
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: true, minLength: 8 })
  @IsString()
  
  @IsEmail()
  email: string;

  constructor(dto: Partial<CreateUserDto>) {
    Object.assign(this, dto);
  }
  
}
