import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bids } from './bids.model';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REGISTER_QUEUE_NAME } from './bids.const';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Bids.name, schema: Bids.schema }]),
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
      name: REGISTER_QUEUE_NAME,
    }),
  ],
  controllers: [BidsController],
  providers: [BidsService, MongooseModule],
})
export class BidsModule {}
