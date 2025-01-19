import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable global validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties not defined in the DTO
      forbidNonWhitelisted: true, // Throw an error for non-whitelisted properties
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Wiki Word Counter')
    .setDescription('Processes Wikipedia articles concurrently.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
