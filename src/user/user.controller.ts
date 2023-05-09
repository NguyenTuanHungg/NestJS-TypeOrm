/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Repository,
  DeleteResult,
  UpdateResult,
  FindOneOptions,
} from 'typeorm';
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Session,
  UseGuards,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { ChangePassword } from './dto/chang-password.dto';
import { Cart } from 'src/cart/entity/cart.entity';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Post('signin')
  async login(
    @Body() loginUserDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.userService.signIn(loginUserDto);
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return result;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req: any) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.RESET_CONTENT)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');
  }

  @Patch('change-password/:id')
  async ChangePassword(
    @Param('id') id: number,
    @Body() body: ChangePassword,
  ): Promise<UpdateResult> {
    return this.userService.changePassword(body, id);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.userService.sendPasswordResetEmail(email);
  }

  @Post('reset-password/:resetToken')
  async resetPassword(
    @Param('resetToken') resetToken: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.userService.resetPassword(resetToken, newPassword);
  }
}
