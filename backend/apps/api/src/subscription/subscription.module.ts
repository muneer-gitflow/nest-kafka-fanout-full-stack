import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SubscriptionResolver } from './subscription.resolver';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { PubSubModule } from '@app/shared';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    PubSubModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionResolver, SubscriptionService],
})
export class SubscriptionModule {}
