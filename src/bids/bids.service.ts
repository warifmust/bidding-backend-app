import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bids } from './bids.model';
import { Model } from 'mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { REGISTER_QUEUE_NAME } from './bids.const';
import { ItemsService } from '../items/items.service';
import { CreateItemDto } from '../items/dto/create-item.dto';

@Injectable()
export class BidsService {
  constructor(
    @InjectModel(Bids.name)
    private readonly bidsModel: Model<Bids>,
    @InjectQueue(REGISTER_QUEUE_NAME)
    private readonly biddingQueue: Queue,
    private itemsService: ItemsService,
  ) {}

  async create(createBidDto: CreateBidDto): Promise<CreateBidDto> {
    const item = await this.itemsService.findOne(createBidDto.itemId);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    if (createBidDto.price < item.price) {
      throw new BadRequestException(
        'Bid price cannot be lower than current price',
      );
    }
    if (createBidDto.price <= 0) {
      throw new BadRequestException('Price cannot zero or negative');
    }
    const bid = await this.bidsModel.create({
      price: createBidDto.price,
      itemId: createBidDto.itemId,
      bidderName: createBidDto.bidderName,
    });

    // Add bid to queue to process
    // TODO: Fix Bull and Redis loading bug
    // await this.biddingQueue.add({ bid });
    return bid;
  }

  async findAll(): Promise<CreateBidDto[]> {
    return this.bidsModel.find({}).sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<CreateBidDto> {
    const bid = await this.bidsModel.findById({ _id: id }).exec();
    if (!bid) {
      throw new HttpException('Bid not found', HttpStatus.NOT_FOUND);
    }
    return bid;
  }

  async findBidsForOneItem(itemId: string): Promise<CreateBidDto[]> {
    const bids = await this.bidsModel.find({ itemId }).exec();

    return bids;
  }

  async findOneAndNominate(id: string): Promise<CreateItemDto> {
    const item = await this.itemsService.findOne(id);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    const bids = await this.findBidsForOneItem(id);

    const highestBidder = bids.reduce(function (prev, current) {
      return prev.price > current.price ? prev : current;
    });

    return this.itemsService.nominateBidWinner(id, highestBidder.bidderName);
  }
}
