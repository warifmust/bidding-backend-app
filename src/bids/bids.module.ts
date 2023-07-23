import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bids, BidsSchema } from './bids.model';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BidsGateway } from './bids.gateway';
import { Users, UsersSchema } from '../users/users.model';
import { Items, ItemsSchema } from '../items/items.model';
import { BIDS_QUEUE_NAME } from './bids.const';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Bids.name, schema: BidsSchema }]),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    MongooseModule.forFeature([{ name: Items.name, schema: ItemsSchema }]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: BIDS_QUEUE_NAME,
    }),
  ],
  controllers: [BidsController],
  providers: [BidsService, BidsGateway],
  exports: [BidsService],
})
export class BidsModule {}
