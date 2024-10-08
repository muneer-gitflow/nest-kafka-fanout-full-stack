import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User, PageInfo } from './user.model';

@ObjectType()
export class Message {
  @Field(() => ID)
  id: number;

  @Field()
  content: string;

  @Field()
  time: Date;

  @Field()
  type: string;

  @Field()
  status: string;

  @Field(() => User)
  chat: User;

  @Field(() => User)
  sender: User;
}

@ObjectType()
class MessageEdge {
  @Field(() => Message)
  node: Message;

  @Field()
  cursor: string;
}

@ObjectType()
export class MessageConnection {
  @Field(() => [MessageEdge])
  edges: MessageEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
