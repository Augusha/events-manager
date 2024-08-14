import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RoleGuard } from './role.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signUpDto: Record<string, any>) {
    return this.authService.signUp(
      signUpDto.email,
      signUpDto.password,
      signUpDto.firstname,
      signUpDto.lastname,
      signUpDto.position,
      signUpDto.role,
    );
  }

  @UseGuards(RoleGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
