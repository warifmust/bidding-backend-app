import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterReqDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}

export class RegisterResDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  accessToken?: string;

  @IsString()
  @IsNotEmpty()
  id: string;
}

export class SignInReqDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignInResDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  balanceAmount?: number;
}
