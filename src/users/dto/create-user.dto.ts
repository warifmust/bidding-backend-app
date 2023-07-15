import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNumber()
  @IsNotEmpty()
  balanceAmount?: number;
}
