require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Jitera Bidding')
    .setDescription('Jitera Bidding built with NestJs')
    .setVersion('1.0')
    // .addTag('jitera-bidding')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('jitera-bidding', app, document);

  await app.listen(3000);
}
bootstrap();
