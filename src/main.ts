import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { SERVER_PORT } from './config/constants';
import { setDefaultUser } from './config/default-user';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000;
  initSwagger(app);
  setDefaultUser(config);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
    //validar lo que manda el cliente
  );
  await app.listen(port);
  logger.log(`Servidor corriendo ${await app.getUrl()}`);
}
bootstrap();
