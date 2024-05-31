'use server';

import db from '@/lib/db';

export async function findChannel(channelId: string) {
  try {
    const channel = await db.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    return channel;
  } catch (error: any) {
    throw new Error(error);
  }
}
