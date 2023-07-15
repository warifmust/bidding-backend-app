import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBidDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  itemId: string;
}
