import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  const config = new DocumentBuilder()
    .setTitle('NestJS Boilerplate')
    .setDescription('API documentation for the NestJS Boilerplate')
    .setVersion('1.0')
    .addTag('api')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // Setup Scalar API Reference
  app.use('/docs', apiReference({ spec: { content: document } }));

  // Configure helmet for HTTP security
  app.use(helmet());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();