'use server';

import db from '@/lib/db';

async function findConversation(memberOneId: string, memberTwoId: string) {
  try {
    const existingConversation = await db.conversation.findFirst({
      where: {
        AND: {
          memberOneId,
          memberTwoId,
        },
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });

    return existingConversation;
  } catch (error: any) {
    throw new Error(error);
  }
}

async function createConversation(memberOneId: string, memberTwoId: string) {
  try {
    const newConversation = await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });

    return newConversation;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findOrCreateConversation(
  memberOneId: string,
  memberTwoId: string
) {
  let conversation =
    (await findConversation(memberOneId, memberTwoId)) ||
    (await findConversation(memberTwoId, memberOneId));

  if (!conversation) {
    conversation = await createConversation(memberOneId, memberTwoId);
  }

  return conversation;
}
