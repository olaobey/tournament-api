import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap'); // Logger instance
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Enable CORS
  app.enableCors({ origin: '*' });
  logger.log('CORS enabled');

  // Use Global Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());
  logger.log('Global exception filter applied');

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  logger.log('Global validation pipe applied');

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('Single-Elimination Tournaments API')
    .setDescription(
      'API documentation for a nestJS-based API for managing single-elimination tournaments',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidocs', app, document);
  logger.log('Swagger documentation set up at /apidocs');

  // Load environment variables
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
