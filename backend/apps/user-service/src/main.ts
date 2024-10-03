import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);
  app.enableCors(); // Add this line
  await app.listen(3002);
  console.log('User Service is running on: http://localhost:3002/graphql');
}
bootstrap();
