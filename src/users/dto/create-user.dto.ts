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

  @IsString()
  @IsNotEmpty()
  id?: string;
}

export class DepositDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  balanceAmount?: number;
}
