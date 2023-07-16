import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bids } from './bids.model';
import { Model } from 'mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { REGISTER_QUEUE_NAME } from './bids.const';

@Injectable()
export class BidsService {
  constructor(
    @InjectModel(Bids.name)
    private readonly bidsModel: Model<Bids>,
    @InjectQueue(REGISTER_QUEUE_NAME)
    private readonly biddingQueue: Queue,
  ) {}

  async create(createBidDto: CreateBidDto): Promise<CreateBidDto> {
    const bid = await this.bidsModel.create({
      price: createBidDto.price,
      itemId: createBidDto.itemId,
    });
    console.log({ bid });

    // Add bid to queue to process
    await this.biddingQueue.add({ bid });
    return bid;
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
