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

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Items.name)
    private readonly itemsModel: Model<Items>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<CreateItemDto> {
    if (createItemDto.price <= 0) {
      throw new BadRequestException('Price cannot zero or negative');
    }

    return this.itemsModel.create({
      itemName: createItemDto.itemName,
      price: createItemDto.price,
      durationInMinutes: createItemDto.durationInMinutes,
      belongsTo: '',
    });
  }

  async findAll(): Promise<CreateItemDto[]> {
    return this.itemsModel.find({}).sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<CreateItemDto> {
    const item = await this.itemsModel.findById({ _id: id }).exec();
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async findOneAndExpire(id: string): Promise<CreateItemDto> {
    const item = await this.itemsModel.findById({ _id: id }).exec();
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return item.updateOne({ expired: true });
  }

  async nominateBidWinner(
    id: string,
    bidderName: string,
  ): Promise<CreateItemDto> {
    const item = await this.itemsModel.findById({ _id: id }).exec();
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return item.updateOne({ belongsTo: bidderName });
  }
}
