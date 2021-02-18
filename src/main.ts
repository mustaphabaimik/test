import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // HTTP headers vulnerabilites protection
  app.use(helmet());
  // CORS activation
  app.enableCors({ origin: ['localhost'] });
  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  // Configure documentation with Swagger & OpenAPI
  const config = new DocumentBuilder()
    .setTitle('NestJS Starter API')
    .setDescription(
      'The NestJS Starter API documentation example with Swagger & OpenAPI',
    )
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Run the App
  await app.listen(3000);
}
bootstrap();
