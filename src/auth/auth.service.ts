import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  CreateAuthReqDto,
  CreateAuthResDto,
  SignInDto,
} from './dto/create-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthReqDto): Promise<CreateAuthResDto> {
    const registerUser = await this.usersService.create(createAuthDto);
    const signInUser = await this.signIn(
      createAuthDto.email,
      createAuthDto.password,
    );

    return {
      name: registerUser.name,
      email: registerUser.email,
      accessToken: signInUser.accessToken,
    };
  }

  async signIn(email: string, password: string): Promise<SignInDto> {
    const user = await this.usersService.findOneByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email, username: user.name };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
