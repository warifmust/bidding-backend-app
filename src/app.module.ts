import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://${process.env.GEDUNG_HADITH_USERNAME}:${process.env.GEDUNG_HADITH_PASSWORD}@cluster0.tmrqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
