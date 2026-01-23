import crypto from 'crypto';
(global as any).crypto = crypto;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);

   const config = new DocumentBuilder()
    .setTitle('Fundar API')
    .setDescription('API documentation for Fundar project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['https://demo2-five-phi.vercel.app', 
     'http://localhost:3000'
    ],
    credentials: true, 
  });
  
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
