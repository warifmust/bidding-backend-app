import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, DepositDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    operationId: 'createUser',
    description: 'Create a new user',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    operationId: 'getAllUsers',
    description: 'Get all users',
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    operationId: 'getAllUserById',
    description: 'Get all user by id',
  })
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @ApiOperation({
    operationId: 'getAllUsersByEmail',
    description: 'Get all user by email',
  })
  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @ApiOperation({
    operationId: 'depositAmount',
    description: 'Deposit amount',
  })
  @Put('deposit')
  deposit(@Body() depositDto: DepositDto) {
    return this.usersService.deposit(depositDto.id, depositDto.balanceAmount);
  }
}
