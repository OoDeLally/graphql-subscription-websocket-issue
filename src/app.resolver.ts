import {
  Field,
  ObjectType,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

@ObjectType()
class Doc {
  @Field()
  name: string;
}

@Resolver(() => Doc)
export class AppResolver {
  readonly pubSub = new PubSub();

  @Query(() => Doc)
  getDoc(): Doc {
    return { name: 'yay' };
  }

  @Subscription(() => Doc)
  subscribeToDoc(): AsyncIterator<Doc> {
    return this.pubSub.asyncIterator('foobar');
  }
}
