import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);

  app.enableCors({
    origin: 'http://localhost:3000', // URL de frontend
    credentials: true, // Para enviar cookies/autenticación
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
