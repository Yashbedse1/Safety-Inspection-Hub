import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ProblemDetailsFilter } from './common/filters/problem-details.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Global exception filter for Problem Details
  app.useGlobalFilters(new ProblemDetailsFilter());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Fire Safety Inspection Hub API')
    .setDescription('REST API for managing building safety inspection checklists')
    .setVersion('1.0')
    .addServer(`http://localhost:${process.env.PORT || 4000}`, 'Development server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Swagger UI endpoint
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // OpenAPI JSON endpoint
  app.use('/docs-json', (req: any, res: any) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger UI available at: http://localhost:${port}/docs`);
  console.log(`OpenAPI JSON available at: http://localhost:${port}/docs-json`);
}

bootstrap();
