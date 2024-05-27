'use server';

import db from '@/lib/db';

export async function findMember(serverId: string, profileId: string) {
  try {
    const member = await db.member.findFirst({
      where: {
        serverId,
        profileId,
      },
      include: {
        profile: true,
      },
    });

    return member;
  } catch (error: any) {
    throw new Error(error);
  }
}
