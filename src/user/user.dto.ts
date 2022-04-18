import { IsNotEmpty, IsString } from 'class-validator';

export class UserReqDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
