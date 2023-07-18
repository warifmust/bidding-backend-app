import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bids')
@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post()
  create(@Body() createBidDto: CreateBidDto) {
    return this.bidsService.create(createBidDto);
  }

  @Get()
  findAll() {
    return this.bidsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bidsService.findOne(id);
  }

  @Get('items/:id')
  findBidsForOneItem(@Param('id') itemId: string) {
    return this.bidsService.findBidsForOneItem(itemId);
  }
}
