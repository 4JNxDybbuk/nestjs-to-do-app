import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JWTAuthGuard } from './auth/guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new JWTAuthGuard()) // use or apply jwt-auth-guards globally..
  await app.listen(3000);
}
bootstrap();
