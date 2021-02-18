import { NestFactory } from '@nestjs/core';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // HTTP headers vulnerabilites protection
  app.use(helmet());
  // CSRF protection
  app.use(csurf());
  // CORS activation
  app.enableCors({ origin: ['localhost'] });
  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  await app.listen(3000);
}
bootstrap();
