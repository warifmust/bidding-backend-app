import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HadithController } from './hadith.controller';
import { Hadith } from './hadith.model';
import { HadithService } from './hadith.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hadith.name, schema: Hadith.schema }]),
  ],
  providers: [HadithService],
  controllers: [HadithController],
  exports: [HadithService, MongooseModule],
})
export class HadithModule {}
