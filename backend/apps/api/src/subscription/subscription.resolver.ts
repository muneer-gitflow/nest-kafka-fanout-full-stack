import { Resolver, Query, Mutation, Subscription, Args } from '@nestjs/graphql';
import { UserStatusUpdateInterface } from './subscription.service';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@ObjectType()
class UserStatusUpdate {
  @Field(() => ID)
  userId: string;

  @Field()
  online: boolean;
}

@InputType()
class UserStatusUpdateInput {
  @Field(() => ID)
  userId: string;

  @Field()
  status: string;
}

@Resolver('Subscription')
export class SubscriptionResolver {
  constructor(@Inject('PUB_SUB') private readonly pubSub: PubSub) {}

  @Query(() => String)
  subscriptionTest() {
    return 'Subscription server is running';
  }

  @Subscription(() => UserStatusUpdate)
  userStatusUpdated() {
    return this.pubSub.asyncIterator('userStatusUpdated');
  }

  @Mutation(() => Boolean)
  triggerUserStatusUpdate(@Args('input') input: UserStatusUpdateInput) {
    const message: UserStatusUpdateInterface = {
      event: {
        userId: input.userId,
        status: input.status,
      },
    };
    this.pubSub.publish('userStatusUpdated', {
      userStatusUpdated: {
        userId: message?.event?.userId || 'no_user_id',
        online: message?.event?.status === 'online',
      },
    });
    return true;
  }
}
