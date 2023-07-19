import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Bids')
@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @ApiOperation({
    operationId: 'bidItem',
    description: 'Bid item',
  })
  @Post()
  create(@Body() createBidDto: CreateBidDto) {
    return this.bidsService.create(createBidDto);
  }

  @ApiOperation({
    operationId: 'getAllBids',
    description: 'Get all bids',
  })
  @Get()
  findAll() {
    return this.bidsService.findAll();
  }

  @ApiOperation({
    operationId: 'getBidById',
    description: 'Get bid by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bidsService.findOne(id);
  }

  @ApiOperation({
    operationId: 'findAllBidsForAnItem',
    description: 'Find all bids for an item',
  })
  @Get('items/:id')
  findBidsForOneItem(@Param('id') itemId: string) {
    return this.bidsService.findBidsForOneItem(itemId);
  }

  @ApiOperation({
    operationId: 'findOneAndNominate',
    description: 'Find an item and nominate bid winner',
  })
  @Put('nominate/:id')
  findOneAndNominate(@Param('id') id: string) {
    return this.bidsService.findOneAndNominate(id);
  }
}
