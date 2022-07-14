import { Controller, Post, Req, Res, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, response, Response } from 'express';
import { UserLoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
// import { STATUS } from '../constants/enums';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  Signin(@Body() body: UserLoginDto) {
    const response = this.authService.Signin(body);
    return response;
  }

  // @Post('/signup')
  // Signup(@Body() body: CreateUserDto) {
  //   const response = this.authService.Signup(body);
  //   return response;
  // }
}
