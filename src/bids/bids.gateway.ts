import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateBidDto } from './dto/create-bid.dto';

@WebSocketGateway()
export class BidsGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('bids')
  handleBids(@MessageBody() bids: CreateBidDto): void {
    this.server.emit('bids', bids);
  }
}
