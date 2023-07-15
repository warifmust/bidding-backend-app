import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bids } from './bids.model';
import { Model } from 'mongoose';

@Injectable()
export class BidsService {
  constructor(
    @InjectModel(Bids.name)
    private readonly bidsModel: Model<Bids>,
  ) {}

  async create(createBidDto: CreateBidDto): Promise<CreateBidDto> {
    return this.bidsModel.create({
      price: createBidDto.price,
      itemId: createBidDto.itemId,
    });
  }

  async findAll(): Promise<CreateBidDto[]> {
    return this.bidsModel.find({});
  }

  async findOne(id: string): Promise<CreateBidDto> {
    const bid = await this.bidsModel.findById({ _id: id }).exec();
    if (!bid) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return bid;
  }
}
