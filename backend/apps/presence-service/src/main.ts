import { NestFactory } from '@nestjs/core';
import { PresenceServiceModule } from './presence-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PresenceServiceModule);
  // Kafka microservice setup

  // The consumer will need to connect to receive messages
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'], // Kafka broker
      },
      consumer: {
        groupId: 'presence-service-group',
      },
    },
  });

  // Start the Kafka microservice
  await app.startAllMicroservices();

  await app.listen(3003);
}
bootstrap();
