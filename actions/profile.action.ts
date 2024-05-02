'use server';

import db from '@/lib/db';
import { User, currentUser } from '@clerk/nextjs/server';

export async function findProfile(userId: string) {
  try {
    const profile = await db.profile.findUnique({
      where: {
        userId,
      },
    });

    return profile;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createProfile() {
  const user = (await currentUser()) as User;
  const profile = await findProfile(user.id);

  if (profile) return profile;

  try {
    let lastName = user.lastName ? ' ' + user.lastName : '';
    const newProfile = await db.profile.create({
      data: {
        userId: user.id,
        name: user.firstName + lastName,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
      },
    });

    return newProfile;
  } catch (error: any) {
    throw new Error(error);
  }
}
