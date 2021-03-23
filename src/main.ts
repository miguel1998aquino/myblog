import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  initSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
    //validar lo que manda el cliente
  );
  await app.listen(3000);
  logger.log(`Servidor corriendo ${await app.getUrl()}`);
}
bootstrap();
