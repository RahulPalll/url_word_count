import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  console.log('JWT_SECRET:', process.env.JWT_SECRET); // Log the value
  const app = await NestFactory.create(AppModule);

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
