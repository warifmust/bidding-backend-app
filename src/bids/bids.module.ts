import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bids } from './bids.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bids.name, schema: Bids.schema }]),
  ],
  controllers: [BidsController],
  providers: [BidsService, MongooseModule],
})
export class BidsModule {}
