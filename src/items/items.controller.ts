import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, NominateBidWinnerDto } from './dto/create-item.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiOperation({
    operationId: 'createItem',
    description: 'Create item',
  })
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @ApiOperation({
    operationId: 'getAllItems',
    description: 'Get all items',
  })
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @ApiOperation({
    operationId: 'getItemById',
    description: 'Get item by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @ApiOperation({
    operationId: 'findItemAndExpire',
    description: 'Find an item and expire it',
  })
  @Put('expire/:id')
  findOneAndExpire(@Param('id') id: string) {
    return this.itemsService.findOneAndExpire(id);
  }

  // @ApiOperation({
  //   operationId: 'nominateBidWinner',
  //   description: 'Find an item and nominate bid winner',
  // })
  // @Put('nominate/:id/:bidderName')
  // nominateBidWinner(
  //   @Param('id') id: string,
  //   @Param('bidderName') bidderName: string,
  // ) {
  //   return this.itemsService.nominateBidWinner(id, bidderName);
  // }
}
