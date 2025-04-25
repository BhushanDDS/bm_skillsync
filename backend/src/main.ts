import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser()); 
  app.enableCors({
    origin: 'http://localhost:5173', // ✅ frontend URL
    credentials: true,               // ✅ allow cookies
  });
  app.useGlobalPipes(new ValidationPipe())
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // Limit each IP to 100 requests per window
  //     skip: (req) => req.url.includes('/auth/refresh') // Custom logic
  //   })
  // );
  await app.listen( 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();