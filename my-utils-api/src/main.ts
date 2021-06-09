import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log({port: process.env.PORT});
  
  await app.listen(process.env.PORT);
}
bootstrap();
