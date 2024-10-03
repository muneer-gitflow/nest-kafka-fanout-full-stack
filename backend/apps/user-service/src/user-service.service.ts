import { Injectable } from '@nestjs/common';
import { User, PageInfo } from './user.model';
import { Message } from './message.model';
import { Chat } from './chat.model'; // You might need to create this file
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class UserServiceService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello from User Service!';
  }

  async getUsers(
    first: number = 10,
    after?: string,
  ): Promise<{ nodes: User[]; pageInfo: PageInfo }> {
    const take = first;
    let skip = 0;

    if (after) {
      const decodedCursor = parseInt(
        Buffer.from(after, 'base64').toString('ascii'),
        10,
      );
      const cursorUser = await this.prisma.user.findUnique({
        where: { id: decodedCursor },
      });
      if (cursorUser) {
        skip = 1; // Skip the cursor
      }
    }

    const users = await this.prisma.user.findMany({
      take: take + 1, // Take one extra to check if there's a next page
      skip,
      orderBy: { id: 'asc' },
    });

    const hasNextPage = users.length > take;
    const nodes = users.slice(0, take);
    const endCursor =
      nodes.length > 0
        ? Buffer.from(nodes[nodes.length - 1].id.toString()).toString('base64')
        : null;

    return {
      nodes: nodes as unknown as User[],
      pageInfo: {
        hasNextPage,
        endCursor,
      },
    };
  }

  async getMessages(
    first: number = 10,
    after?: string,
  ): Promise<{ nodes: Message[]; pageInfo: PageInfo }> {
    const take = first;
    let skip = 0;

    if (after) {
      const decodedCursor = parseInt(
        Buffer.from(after, 'base64').toString('ascii'),
        10,
      );
      const cursorMessage = await this.prisma.message.findUnique({
        where: { id: decodedCursor },
      });
      if (cursorMessage) {
        skip = 1; // Skip the cursor
      }
    }

    const messages = await this.prisma.message.findMany({
      take: take + 1,
      skip,
      orderBy: { time: 'desc' },
      include: {
        chat: true,
        sender: true,
      },
    });

    const hasNextPage = messages.length > take;
    const nodes = messages.slice(0, take);
    const endCursor =
      nodes.length > 0
        ? Buffer.from(nodes[nodes.length - 1].id.toString()).toString('base64')
        : null;

    return {
      nodes: nodes as unknown as Message[],
      pageInfo: {
        hasNextPage,
        endCursor,
      },
    };
  }

  async getChats(
    first: number = 10,
    after?: string,
  ): Promise<{ nodes: Chat[]; pageInfo: PageInfo }> {
    const take = first;
    let skip = 0;

    if (after) {
      const decodedCursor = parseInt(
        Buffer.from(after, 'base64').toString('ascii'),
        10,
      );
      const cursorChat = await this.prisma.chat.findUnique({
        where: { id: decodedCursor },
      });
      if (cursorChat) {
        skip = 1; // Skip the cursor
      }
    }

    const chats = await this.prisma.chat.findMany({
      take: take + 1,
      skip,
      orderBy: { time: 'desc' },
      include: {
        user: true,
        messages: {
          take: 1,
          orderBy: { time: 'desc' },
        },
      },
    });

    const hasNextPage = chats.length > take;
    const nodes = chats.slice(0, take).map((chat) => ({
      ...chat,
      lastMessage: chat.messages[0]?.content || null,
    }));
    const endCursor =
      nodes.length > 0
        ? Buffer.from(nodes[nodes.length - 1].id.toString()).toString('base64')
        : null;

    return {
      nodes,
      pageInfo: {
        hasNextPage,
        endCursor,
      },
    };
  }
}
