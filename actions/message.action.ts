'use server';

import db from '@/lib/db';

export async function getMessages(channelId: string) {
  try {
    const messages = await db.message.findMany({
      where: {
        channelId,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return messages;
  } catch (error: any) {
    throw new Error(error);
  }
}
