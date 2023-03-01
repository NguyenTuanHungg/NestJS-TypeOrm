import { IsNotEmpty, IsString, IsEmail, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto  {
@ApiProperty({ required: true })
  
  @IsNotEmpty()
  username: string;

  @ApiProperty({ required: true, minLength: 8 })
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;
}