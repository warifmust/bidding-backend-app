import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';

@WebSocketGateway()
export class BidsGateway {
  constructor(private readonly bidsService: BidsService) {}
  @WebSocketServer()
  server;

  @SubscribeMessage('createBid')
  create(
    @MessageBody() createBidDto: CreateBidDto,
    @MessageBody() userId: string,
  ) {
    return this.bidsService.create(createBidDto, userId);
  }

  @SubscribeMessage('findAllBids')
  findAll() {
    return this.bidsService.findAll();
  }

  @SubscribeMessage('findOne')
  findOne(@MessageBody() id: string) {
    return this.bidsService.findOne(id);
  }

  @SubscribeMessage('findBidsForOneItem')
  findBidsForOneItem(@MessageBody() id: string) {
    return this.bidsService.findOne(id);
  }

  @SubscribeMessage('findOneAndNominate')
  findOneAndNominate(@MessageBody() id: string) {
    return this.bidsService.findOneAndNominate(id);
  }
}
