import { Controller, Get, Logger } from '@nestjs/common';
import { PresenceServiceService } from './presence-service.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class PresenceServiceController {
  private readonly logger = new Logger(PresenceServiceController.name);
  constructor(
    private readonly presenceServiceService: PresenceServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.presenceServiceService.getHello();
  }

  @EventPattern('test')
  async handleMessage(@Payload() message: any): Promise<void> {
    this.logger.debug(`Raw message from Kafka: ${JSON.stringify(message)}`);
  }
}
