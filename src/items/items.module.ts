import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Items } from './items.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Items.name, schema: Items.schema }]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, MongooseModule],
})
export class ItemsModule {}
