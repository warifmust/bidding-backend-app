require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Jitera Bidding')
    .setDescription('Jitera Bidding built with NestJs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen(3000);
  console.log(`Listening on port ${await app.getUrl()}`);
}
bootstrap();
