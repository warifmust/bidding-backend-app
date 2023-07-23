import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';

@WebSocketGateway()
export class ItemsGateway {
  constructor(private readonly itemsService: ItemsService) {}
  @WebSocketServer()
  server;

  @SubscribeMessage('createItem')
  create(@MessageBody() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @SubscribeMessage('findAllItems')
  findAll() {
    return this.itemsService.findAll();
  }

  @SubscribeMessage('findOneItem')
  findOne(@MessageBody() id: string) {
    return this.itemsService.findOne(id);
  }

  @SubscribeMessage('findOneItemAndExpire')
  findOneAndExpire(@MessageBody() id: string) {
    return this.itemsService.findOne(id);
  }

  @SubscribeMessage('nominateBidWinner')
  nominateBidWinner(
    @MessageBody() id: string,
    @MessageBody() bidderName: string,
  ) {
    return this.itemsService.nominateBidWinner(id, bidderName);
  }
}
