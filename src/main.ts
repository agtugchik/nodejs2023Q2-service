import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggerService } from './logger/logger.service';

const PORT = Number(process.env.PORT) || 4000;

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(new LoggerService());

  const options = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home Library Service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}
bootstrap();
