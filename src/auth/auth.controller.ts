import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthReqDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthReqDto: CreateAuthReqDto) {
    return this.authService.register(createAuthReqDto);
  }

  @Post('sign-in')
  signIn(@Body() createAuthReqDto: CreateAuthReqDto) {
    return this.authService.signIn(
      createAuthReqDto.email,
      createAuthReqDto.password,
    );
  }
}
