import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BidsModule } from './bids/bids.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    BidsModule,
    MongooseModule.forRoot(process.env.GEDUNG_HADITH_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
