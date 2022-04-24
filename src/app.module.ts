import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// import { UserModule } from './user/user.module';
import { HadithModule } from './hadith/hadith.module';
import { NarratorsModule } from './narrators/narrators.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.GEDUNG_HADITH_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    // UserModule,
    HadithModule,
    NarratorsModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
