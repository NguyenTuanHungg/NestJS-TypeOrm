import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {jwtConstants} from './auth/constant'
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from './entity/user.entity'
import{LoginDto} from './dto/login-user.dto'
import { JwtStrategy } from './strategy/jwt.strategy';
import { RolesGuard } from './role/role.guard';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '90s' },
    }),],
  
  controllers: [UserController],
  providers: [UserService,JwtStrategy,RolesGuard]
})
export class UserModule {}
