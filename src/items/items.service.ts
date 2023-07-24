import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Items } from './items.model';
import { Model } from 'mongoose';
// import { InjectQueue } from '@nestjs/bull';
// import { ITEMS_QUEUE_NAME } from './items.const';
// import { Queue } from 'bull';

@Injectable()
export class ItemsService {
  constructor(
    // @InjectQueue(ITEMS_QUEUE_NAME) private itemsQueue: Queue,
    @InjectModel(Items.name)
    private readonly itemsModel: Model<Items>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<CreateItemDto> {
    if (createItemDto.price <= 0) {
      throw new BadRequestException('Price cannot zero or negative');
    }

    const item = await this.itemsModel.create({
      itemName: createItemDto.itemName,
      price: createItemDto.price,
      durationInMinutes: createItemDto.durationInMinutes,
      belongsTo: '',
    });

    // await this.itemsQueue.add(item);
    return item;
  }

  async findAll(): Promise<CreateItemDto[]> {
    const items = await this.itemsModel.find({}).sort({ createdAt: -1 });

    // await this.itemsQueue.add(items);
    return items;
  }

  async findOne(id: string): Promise<CreateItemDto> {
    const item = await this.itemsModel.findById({ _id: id });
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async findOneAndExpire(id: string): Promise<CreateItemDto> {
    const item = await this.itemsModel.findById({ _id: id });
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return this.itemsModel.findOneAndUpdate({ _id: id }, { expired: true });
  }

  async nominateBidWinner(
    id: string,
    bidderName: string,
  ): Promise<CreateItemDto> {
    const item = await this.itemsModel.findById({ _id: id });
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }

    return this.itemsModel.findByIdAndUpdate(
      { _id: id },
      { belongsTo: bidderName },
    );
  }
}
