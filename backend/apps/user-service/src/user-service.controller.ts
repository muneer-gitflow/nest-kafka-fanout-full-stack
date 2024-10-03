import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class UserServiceController implements OnModuleInit {
  constructor(
    private readonly userServiceService: UserServiceService,
    @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
  ) {}

  async onModuleInit() {
    setInterval(() => {
      this.sendEvent();
    }, 5000);
  }

  async sendEvent() {
    const message = {
      timestamp: new Date().toISOString(),
      event: 'Test event',
    };
    await this.kafkaService.emit('test', message);
  }

  @Get()
  getHello(): string {
    return this.userServiceService.getHello();
  }
}
