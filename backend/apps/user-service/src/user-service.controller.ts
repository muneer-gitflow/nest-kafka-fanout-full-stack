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
    const users = await this.userServiceService.getUsers();

    if (users?.nodes?.length === 0) return;

    const randomUser =
      users.nodes[Math.floor(Math.random() * users.nodes.length)];

    const message = {
      timestamp: new Date().toISOString(),
      event: {
        userId: randomUser.id,
        status: Math.random() > 0.5 ? 'online' : 'offline',
      },
    };
    await this.kafkaService.emit('user.status.updated', message);
  }

  @Get()
  getHello(): string {
    return this.userServiceService.getHello();
  }
}
