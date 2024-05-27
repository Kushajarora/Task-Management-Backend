import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables at the very top

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common'

console.log('JWT_SECRET in main.ts:', process.env.JWT_SECRET); // Verify loading

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }
  ));
  await app.listen(3000);
}
bootstrap();
