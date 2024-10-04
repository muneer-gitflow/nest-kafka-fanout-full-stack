import { Inject, Injectable, Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

export interface UserStatusUpdateInterface {
  event: {
    userId: string;
    status: string;
  };
}

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);

  constructor(@Inject('PUB_SUB') private readonly pubSub: PubSub) {}

  chatUpdated() {
    return this.pubSub.asyncIterator('chatUpdated');
  }

  userStatusUpdated() {
    return this.pubSub.asyncIterator('userStatusUpdated');
  }

  triggerChatUpdate(message: string) {
    this.pubSub.publish('chatUpdated', { chatUpdated: { content: message } });
  }

  async triggerUserStatusUpdate(message: UserStatusUpdateInterface) {
    const payload = {
      userStatusUpdated: {
        userId: message.event.userId,
        online: message.event.status === 'online',
      },
    };
    try {
      await this.pubSub.publish('userStatusUpdated', payload);
      return true;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
