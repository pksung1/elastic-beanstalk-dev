import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppLogger } from './share/logger/AppLogger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLogger(),
  });
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('All In One API')
    .setDescription('All In One API 입니다')
    .setVersion('1.0')
    .addTag('all-in-one')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // console.log(document);
  // fs.writeFileSync(process.env.SWAGGER_EXPORT_PATH, JSON.stringify(document));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
