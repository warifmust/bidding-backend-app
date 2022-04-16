import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { HadithService } from './hadith/hadith.service';
import { HadithController } from './hadith/hadith.controller';

@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://${process.env.GEDUNG_HADITH_USERNAME}:${process.env.GEDUNG_HADITH_PASSWORD}@cluster0.tmrqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)],
  controllers: [AppController, UserController, HadithController],
  providers: [AppService, UserService, HadithService],
})
export class AppModule { }
