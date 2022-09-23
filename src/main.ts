import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';

const gethttpsOptionsFromEnv = (): HttpsOptions | undefined => {
  if (!process.env.USE_TLS) {
    console.log('Not using TLS (HTTP / WS)');
    return undefined;
  }
  console.log('Using TLS (HTTPS / WSS)');
  const privateKey = fs.readFileSync('./localhost-key.pem', 'utf8');
  const certificate = fs.readFileSync('./localhost.pem', 'utf8');
  return { key: privateKey, cert: certificate };
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: gethttpsOptionsFromEnv(),
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
