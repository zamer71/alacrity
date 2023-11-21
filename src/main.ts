import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  // In real application some of security middlewares should be used
  await app.listen(3000);
}
bootstrap();
