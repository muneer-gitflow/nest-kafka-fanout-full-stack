import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // Start the main application (Federation)
  const app = await NestFactory.create(AppModule);

  // Configure Kafka microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'api-consumer',
      },
    },
  });

  // Start the subscription server
  const subscriptionApp = await NestFactory.create(SubscriptionModule);

  // Start all services concurrently
  await Promise.all([
    app.startAllMicroservices(),
    app.listen(3000),
    subscriptionApp.listen(9001),
  ]);

  logger.log('Main application is running on: http://localhost:3000');
  logger.log('Subscription server is running on: http://localhost:9001');
  logger.log('Kafka microservice is connected');
}

bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
  process.exit(1);
});
