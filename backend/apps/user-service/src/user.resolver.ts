import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UserServiceService } from './user-service.service';
import { User, UserConnection } from './user.model';
import { MessageConnection } from './message.model';
import { ChatConnection } from './chat.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserServiceService) {}

  @Query(() => UserConnection)
  async users(
    @Args('first', { type: () => Int, nullable: true }) first: number,
    @Args('after', { nullable: true }) after: string,
  ): Promise<UserConnection> {
    const { nodes, pageInfo } = await this.userService.getUsers(first, after);
    return {
      edges: nodes.map((node) => ({
        node,
        cursor: Buffer.from(node.id.toString()).toString('base64'),
      })),
      pageInfo,
    };
  }

  @Query(() => MessageConnection)
  async messages(
    @Args('first', { type: () => Int, nullable: true }) first: number,
    @Args('after', { nullable: true }) after: string,
  ): Promise<MessageConnection> {
    const { nodes, pageInfo } = await this.userService.getMessages(
      first,
      after,
    );
    return {
      edges: nodes.map((node) => ({
        node,
        cursor: Buffer.from(node.id.toString()).toString('base64'),
      })),
      pageInfo,
    };
  }

  @Query(() => ChatConnection)
  async chats(
    @Args('first', { type: () => Int, nullable: true }) first: number,
    @Args('after', { nullable: true }) after: string,
  ): Promise<ChatConnection> {
    const { nodes, pageInfo } = await this.userService.getChats(first, after);
    return {
      edges: nodes.map((node) => ({
        node,
        cursor: Buffer.from(node.id.toString()).toString('base64'),
      })),
      pageInfo,
    };
  }

  @Query(() => String)
  helloUser(): string {
    return this.userService.getHello();
  }
}
