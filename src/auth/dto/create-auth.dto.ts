import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAuthReqDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  accessToken?: string;
}

export class CreateAuthResDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  accessToken?: string;
}

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}

