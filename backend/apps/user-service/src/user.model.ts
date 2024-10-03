import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Message } from './message.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  online: boolean;

  @Field(() => [Message], { nullable: true })
  messages?: Message[];
}

@ObjectType()
export class PageInfo {
  @Field()
  hasNextPage: boolean;

  @Field({ nullable: true })
  endCursor?: string;
}

@ObjectType()
class UserEdge {
  @Field(() => User)
  node: User;

  @Field()
  cursor: string;
}

@ObjectType()
export class UserConnection {
  @Field(() => [UserEdge])
  edges: UserEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
