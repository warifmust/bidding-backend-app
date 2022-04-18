import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(private readonly userService: UserService) {}

  async signUp(): Promise<any> {
    return 'Hello World!';
  }

  async signIn(): Promise<any> {
    return 'Hello World!';
  }

  async signOut(): Promise<any> {
    return 'Hello World!';
  }
}
