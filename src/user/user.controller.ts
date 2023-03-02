import { Repository,DeleteResult,UpdateResult, FindOneOptions } from 'typeorm';
import { Controller, Post,Body,Param,Put,Patch, Request,Session,UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {LoginDto} from './dto/login-user.dto';
import {UserService} from './user.service'
import {User} from './entity/user.entity'
import {ChangePassword} from './dto/chang-password.dto'
import { Cart } from 'src/cart/entity/cart.entity';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService 
    ){}
 
    @Post('register')
     async signUp(@Body() createUserDto:CreateUserDto)
     {
        return this.userService.signUp(createUserDto)
     }

     @Post('signin')
     async signIn(@Body() loginDto:LoginDto):Promise<{accessToken:string}>{
        
        return this.userService.signIn(loginDto)
     }
     @UseGuards(JwtAuthGuard)
     @Patch('change-password/:id')
     async ChangePassword( @Param('id') id:number,@Body() body:ChangePassword):Promise<UpdateResult>{
      return this.userService.changePassword(body,id)
     }
    
   
}
