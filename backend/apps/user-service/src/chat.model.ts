import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User, PageInfo } from './user.model';

@ObjectType()
export class Chat {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  lastMessage?: string;

  @Field()
  time: Date;

  @Field()
  unread: number;

  @Field(() => User)
  user: User;
}

@ObjectType()
class ChatEdge {
  @Field(() => Chat)
  node: Chat;

  @Field()
  cursor: string;
}

@ObjectType()
export class ChatConnection {
  @Field(() => [ChatEdge])
  edges: ChatEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}