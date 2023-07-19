import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterReqDto, SignInReqDto } from './dto/create-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    operationId: 'registerUser',
    description: 'Register a new user',
  })
  @Post('register')
  register(@Body() registerReqDto: RegisterReqDto) {
    return this.authService.register(registerReqDto);
  }

  @ApiOperation({
    operationId: 'signInUser',
    description: 'Sign in into current account',
  })
  @Post('sign-in')
  signIn(@Body() signInReqDto: SignInReqDto) {
    return this.authService.signIn(signInReqDto.email, signInReqDto.password);
  }
}
