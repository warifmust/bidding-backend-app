import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterReqDto, SignInReqDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerReqDto: RegisterReqDto) {
    return this.authService.register(registerReqDto);
  }

  @Post('sign-in')
  signIn(@Body() signInReqDto: SignInReqDto) {
    return this.authService.signIn(signInReqDto.email, signInReqDto.password);
  }
}
