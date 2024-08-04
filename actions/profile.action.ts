'use server';

import db from '@/lib/db';
import { auth, currentUser } from '@clerk/nextjs/server';

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

export async function getCurrentProfile() {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  try {
    const profile = await findProfile(userId);

    return profile;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createProfile() {
  const user = await currentUser();

  if (!user) return;

  const { id, username, imageUrl } = user;
  const profile = await findProfile(id);

  if (profile) return profile;

  try {
    const newProfile = await db.profile.create({
      data: {
        userId: id,
        username: username ?? '',
        imageUrl,
      },
    });

    return newProfile;
  } catch (error: any) {
    throw new Error(error);
  }
}
