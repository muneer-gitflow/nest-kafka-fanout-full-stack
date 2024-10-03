import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const users = await Promise.all(
    Array.from({ length: 20 }, () =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          online: faker.datatype.boolean(),
        },
      }),
    ),
  );

  // Create chats for each user
  for (const user of users) {
    const messageCount = faker.number.int({ min: 30, max: 40 });
    const chatUser = faker.helpers.arrayElement(
      users.filter((u) => u.id !== user.id),
    );

    await prisma.chat.create({
      data: {
        name: chatUser.name,
        lastMessage: faker.lorem.sentence(),
        time: faker.date.recent(),
        unread: faker.number.int({ min: 0, max: 5 }),
        user: { connect: { id: user.id } },
        messages: {
          create: Array.from({ length: messageCount }, () => ({
            content: faker.lorem.sentence(),
            time: faker.date.recent(),
            type: faker.helpers.arrayElement(['text', 'image', 'file']),
            status: faker.helpers.arrayElement(['sent', 'delivered', 'read']),
            sender: {
              connect: {
                id: faker.helpers.arrayElement([user.id, chatUser.id]),
              },
            },
          })),
        },
      },
    });
  }

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
