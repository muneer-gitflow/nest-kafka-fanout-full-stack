import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Resolver()
export class AppResolver {
  constructor(
    private readonly appService: AppService,
    @Inject('USER_SERVICE') private userServiceClient: ClientProxy,
  ) {}

  @Query(() => String)
  hello(): string {
    return this.appService.getHello();
  }

  @Query(() => String)
  async helloUser(): Promise<string> {
    const response = await lastValueFrom(
      this.userServiceClient.send({ cmd: 'helloUser' }, {}),
    );
    return response;
  }
}
