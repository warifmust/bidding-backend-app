import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  RegisterReqDto,
  RegisterResDto,
  SignInResDto,
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

  async register(registerReqDto: RegisterReqDto): Promise<RegisterResDto> {
    let registerUser: RegisterReqDto;
    try {
      registerUser = await this.usersService.create(registerReqDto);

      const signInUser = await this.signIn(
        registerReqDto.email,
        registerReqDto.password,
      );
      return {
        accessToken: signInUser.accessToken,
        name: registerUser.name,
        email: registerUser.email,
        id: signInUser.id,
        ...(signInUser.balanceAmount && {
          balanceAmount: signInUser.balanceAmount,
        }),
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async signIn(email: string, password: string): Promise<SignInResDto> {
    const user = await this.usersService.findOneByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email, username: user.name };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      name: user.name,
      email: user.email,
      id: user.id,
      ...(user.balanceAmount && { balanceAmount: user.balanceAmount }),
    };
  }
}
