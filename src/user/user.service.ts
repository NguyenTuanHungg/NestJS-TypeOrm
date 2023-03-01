import { Injectable,UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import {User} from './entity/user.entity'
import {CreateUserDto} from './dto/create-user.dto'
import { Repository,DeleteResult,UpdateResult} from 'typeorm';
import {JwtService} from '@nestjs/jwt';
import{LoginDto} from './dto/login-user.dto'
import {ChangePassword} from './dto/chang-password.dto'
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
        private readonly jwtService: JwtService
    ){}
    //sign up
    async signUp(createUserDto:CreateUserDto):Promise<User> {
        
      if (await this.usersRepo.findOne({where:{ username:createUserDto.username }})) {
        throw new UnauthorizedException('username already in use');
      }
        const hashedPassword = await bcrypt.hash(createUserDto.password,10);
        const newUser = this.usersRepo.create({
          ...createUserDto,
          password: hashedPassword
        });
    
        await this.usersRepo.save(newUser);
  
        return newUser
      }
      //sign in
      async signIn(loginDto:LoginDto): Promise< {accessToken:string} >{
        
        const user:User = await this.usersRepo.findOne({where:{username:loginDto.username}})
        const password:string=loginDto.password
        if (!user) {
          return null;
        }
        const passwordValid:boolean = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
          return null;
        }
        const payload = { email: user.email};
        const accessToken=this.jwtService.sign(payload)
        return {
          accessToken
        };
      }
      async changePassword(params: ChangePassword, id: number): Promise<UpdateResult> {
        const user:User = await this.usersRepo.findOne({where:{ id }});
        if (!user) {
          throw new UnauthorizedException();
        }
        const password = await bcrypt.compare(params.oldPassword, user.password);
        if (!password) {
          throw new UnauthorizedException();
        }
        const salt:string = bcrypt.genSaltSync(10);

        const updateProps= {
            password: bcrypt.hashSync(params.newPassword,salt),
          };
       const change=  await this.usersRepo.update(
            {id},
            updateProps,
          );
       return change
      }
  
}
