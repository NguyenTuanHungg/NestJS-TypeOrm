import { Injectable,UnauthorizedException,NotFoundException} from '@nestjs/common';
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
      async signIn(loginDto:LoginDto){
        
        const { id } = await this.validateUser(loginDto);

         return this.generateTokens(id);
      }
      
      // Change Password
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

      async setRefreshToken(id:number, refreshToken: string) {
        const user = await this.usersRepo.findOne({where:{id}});
    
        return this.usersRepo.save({
          ...user,
          refreshToken,
        });
      }
      
      async generateTokens(id: number) {
        const payload = { id };
    
        const accessToken = this.jwtService.sign(payload, {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '30m',
        });
        const refreshToken = this.jwtService.sign(payload, {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '30d',
        });
    
        await this.setRefreshToken(id, refreshToken);
    
        return { accessToken, refreshToken };
      }


      private async validateUser(loginDto: LoginDto) {
        const user = await this.usersRepo.findOne({where:{username:loginDto.username}});
    
        if (!user) {
          throw new NotFoundException(
            `There is no user under this email ${loginDto.username}`,
          );
        }
    
        const passwordEquals = await bcrypt.compare(
          loginDto.password,
          user.password,
        );
    
        if (passwordEquals) {
          return user;
        }
    
        throw new UnauthorizedException({ message: 'Incorrect password' });
      }

      verifyRefreshToken(refreshToken: string) {
        
        const decodedId = this.jwtService.verify(refreshToken, {
          secret: process.env.JWT_REFRESH_SECRET,
        });
    
        return decodedId;
      }

      async removeRefreshToken(id: number) {
        const user = await this.usersRepo.findOne({where:{id}});
    
        return this.usersRepo.save({
          ...user,
          refreshToken: null,
        });
      }
     
}
