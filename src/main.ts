import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config  = new DocumentBuilder().setTitle('NestJS API')
  .setDescription('The NestJS API description').setVersion('1.0').addTag('NestJS').build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document);
  await app.listen(3000);
}
bootstrap();
