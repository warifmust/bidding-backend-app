import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NarratorsController } from './narrators.controller';
import { Narrators } from './narrators.model';
import { NarratorsService } from './narrators.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Narrators.name, schema: Narrators.schema },
    ]),
  ],
  providers: [NarratorsService],
  controllers: [NarratorsController],
  exports: [NarratorsService, MongooseModule],
})
export class NarratorsModule {}
