import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateExpiredDto } from './dto/update-item.dto';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Put(':id')
  expireItem(@Body() updateExpiredDto: UpdateExpiredDto) {
    return this.itemsService.expireItem(updateExpiredDto.id);
  }
}
