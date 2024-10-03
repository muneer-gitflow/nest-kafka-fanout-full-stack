import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Create 20 users
  const users = await Promise.all(
    Array.from({ length: 20 }, () =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          online: faker.datatype.boolean(),
        },
      })
    )
  );

  // Create chats for each user
  for (const user of users) {
    const messageCount = faker.number.int({ min: 30, max: 40 });
    const messages = Array.from({ length: messageCount }, (_, index) => ({
      sender: index % 2 === 0 ? user.name : 'You',
      content: faker.lorem.sentence(),
      time: faker.date.past(),
      type: 'text',
      status: faker.helpers.arrayElement(['sent', 'delivered', 'read']),
    }));

    // Sort messages by time
    messages.sort((a, b) => a.time.getTime() - b.time.getTime());

    await prisma.chat.create({
      data: {
        name: user.name,
        lastMessage: messages[messages.length - 1].content,
        time: messages[messages.length - 1].time,
        unread: faker.number.int({ min: 0, max: 5 }),
        userId: user.id,
        messages: {
          create: messages,
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
