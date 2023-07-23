import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { Users } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private readonly usersModel: Model<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordRegex = /^[A-Za-z0-9]*$/;
    const isEmailValid = emailRegex.test(createUserDto.email);
    const isPasswordValid = passwordRegex.test(createUserDto.password);
    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = await this.usersModel.findOne({ email: createUserDto.email });

    if (user) {
      throw new BadRequestException('User already exist');
    }

    if (!isEmailValid) {
      throw new BadRequestException('Email not valid');
    }

    if (createUserDto.password.length < 8 || !isPasswordValid) {
      throw new BadRequestException('Password is too short or too weak');
    }

    return this.usersModel.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      balanceAmount: createUserDto.balanceAmount || 0,
    });
  }

  async findAll(): Promise<CreateUserDto[]> {
    return this.usersModel.find({});
  }

  async findOneById(id: string): Promise<CreateUserDto> {
    const user = await this.usersModel.findById({ _id: id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<CreateUserDto> {
    const user = await this.usersModel.findOne({ email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async deposit(id: string, amount: number): Promise<CreateUserDto> {
    const user = await this.usersModel.findOne({ _id: id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.usersModel.findByIdAndUpdate(
      { _id: id },
      { $inc: { balanceAmount: amount } },
    );
  }
}
