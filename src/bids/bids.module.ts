import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bids, BidsSchema } from './bids.model';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REGISTER_QUEUE_NAME } from './bids.const';
import { BidsGateway } from './bids.gateway';
import { ItemsModule } from '../items/items.module';
import { Users, UsersSchema } from '../users/users.model';

@Module({
  imports: [
    ItemsModule,
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Bids.name, schema: BidsSchema }]),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
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
  providers: [BidsService, BidsGateway],
  exports: [BidsService],
})
export class BidsModule {}
