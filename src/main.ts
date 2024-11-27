import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000).then(() => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}
bootstrap();