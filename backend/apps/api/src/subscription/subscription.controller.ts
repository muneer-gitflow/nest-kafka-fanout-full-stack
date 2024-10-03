import { Controller, Inject, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PubSub } from 'graphql-subscriptions';
import { UserStatusUpdateInterface } from './subscription.service';

@Controller()
export class SubscriptionController {
  private readonly logger = new Logger(SubscriptionController.name);

  constructor(@Inject('PUB_SUB') private readonly pubSub: PubSub) {}

  @EventPattern('user.status.updated')
  async handleMessage(@Payload() message: UserStatusUpdateInterface) {
    this.logger.debug('Received Kafka message: user.status.updated', message);
    this.pubSub.publish('userStatusUpdated', {
      userStatusUpdated: {
        userId: message?.event?.userId || 'no_user_id',
        online: message?.event?.status === 'online',
      },
    });
  }
}
