import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { constructSwaggerErrorResponses } from 'src/shared/swagger.helper';
import { UserReqDto } from './user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get('user')
  // async getUser(): Promise<any> {
  //   return this.userService.getUser();
  // }

  // @Get('users')
  // getUsers(): Promise<any> {
  //   return this.userService.getUsers();
  // }

  @Post('sign-up')
  @ApiNotFoundResponse(
    constructSwaggerErrorResponses([
      {
        message: 'User not found',
        statusCode: 401,
        errorCode: '10001',
      },
    ]),
  )
  // @ApiOkResponse({
  //   type: Function,
  //   description: 'User created successfully',
  // })
  signUp() {
    return this.userService.signUp();
  }

  @Post('sign-in')
  @ApiNotFoundResponse(
    constructSwaggerErrorResponses([
      {
        message: 'User not found',
        statusCode: 401,
        errorCode: '10001',
      },
    ]),
  )
  // @ApiOkResponse({
  //   type: Function,
  //   description: 'User created successfully',
  // })
  signIn() {
    return this.userService.signIn();
  }

  @Post('sign-out')
  @ApiNotFoundResponse(
    constructSwaggerErrorResponses([
      {
        message: 'User not found',
        statusCode: 401,
        errorCode: '10001',
      },
    ]),
  )
  // @ApiOkResponse({
  //   type: Function,
  //   description: 'User created successfully',
  // })
  signOut() {
    return this.userService.signOut();
  }

  // @Post('reset-password')
  // resetPassword(): Promise<any> {
  //   return this.userService.resetPassword();
  // }

  // @Post('confirm-user')
  // confirmUser(): Promise<any> {
  //   return this.userService.confirmUser();
  // }
}
